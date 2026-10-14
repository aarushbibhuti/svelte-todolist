<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let task = $state("");
  let priority = $state("");
</script>

<h1
  class="text-3xl font-bold bg-slate-500 py-2 rounded-b-lg flex gap-4 shadow-lg text-slate-100 px-3"
>
  svelte todolist - aarushbib
</h1>
<div class="flex justify-center mt-6">
  <form
    method="POST"
    action="?/add"
    class={["w-5/6 px-5 py-5 shadow-md rounded-xl border-2 bg-white", {"border-red-500": priority === "high", "border-yellow-500": priority === "medium", "border-green-500": priority === "low"}, {"border-slate-200": priority === ""}]}
  >
    <div class="mb-5">
      <label for="task" class="block text-sm font-semibold text-slate-700"
        >Task:</label
      >
      <input
        id="task"
        name="task"
        type="text"
        placeholder="enter a task"
        bind:value={task}
        required
        class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 shadow-sm placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
      />
    </div>
    <fieldset class="space-y-2">
      <legend class="mb-3 text-sm font-semibold text-slate-700"
        >Enter the priority:</legend
      >
      <div class="flex flex-col gap-1">
        <label
        class="flex cursor-pointer items-center gap-3 rounded-md
         border border-slate-200 px-3 py-2.5
         text-sm text-slate-700 transition-colors
         hover:bg-red-100"
        >
          <input
            type="radio"
            name="priority"
            value="high"
            class="accent-slate-800"
            bind:group={priority}
            required
          />
          High
        </label>

        <label class="flex cursor-pointer items-center gap-3 rounded-md
         border border-slate-200 px-3 py-2.5
         text-sm text-slate-700 transition-colors
         hover:bg-yellow-100">
          <input
            type="radio"
            name="priority"
            value="medium"
            class="accent-slate-800"
            bind:group={priority}
          />
          Medium
        </label>

        <label class="flex cursor-pointer items-center gap-3 rounded-md
         border border-slate-200 px-3 py-2.5
         text-sm text-slate-700 transition-colors
         hover:bg-green-100">
          <input
            type="radio"
            name="priority"
            value="low"
            class="accent-slate-800"
            bind:group={priority}
          />
          Low
        </label>
      </div>
    </fieldset>
    <button
      type="submit"
      class="mt-5 w-full rounded-md bg-slate-900
       px-4 py-2.5 text-sm font-semibold text-white
       transition-colors hover:bg-slate-700
       focus-visible:outline-2
       focus-visible:outline-offset-2
       focus-visible:outline-slate-500"
    >
      Add Task
    </button>
  </form>
</div>

<div class="w-5/6 mx-auto mt-4">
  <div class="grid grid-cols-3 gap-4">
    {#each data.todos as currentTask (currentTask.id)}
      <div
        class={[
          "border-2 p-5 rounded-xl shadow-md",
          {
            "border-red-500 bg-red-50": currentTask.priority === "high",
            "border-yellow-500 bg-yellow-50": currentTask.priority === "medium",
            "border-green-500 bg-green-50": currentTask.priority === "low",
          },
        ]}
      >
        <p class="text-lg font-semibold">{currentTask.task}</p>
        <p
          class={[
            "text-sm text-gray-500 capitalize mt-1",
            {
              "text-red-500": currentTask.priority === "high",
              "text-yellow-500": currentTask.priority === "medium",
              "text-green-500": currentTask.priority === "low",
            },
          ]}
        >
          {currentTask.priority}
        </p>
        <form method="POST" action="?/delete" class="mt-2">
          <input type="hidden" name="id" value={currentTask.id} />
          <button
            type="submit"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </form>
      </div>
    {/each}
  </div>
</div>
