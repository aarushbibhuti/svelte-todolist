<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let task = $state("");
  let priority = $state("");
</script>

<h1
  class="text-3xl font-bold bg-[#ff3c00] py-2 rounded-b-lg flex justify-center gap-4 shadow-lg text-white"
>
  Welcome to SvelteKit
</h1>
<div class="flex flex-col items-center justify-center gap-4 mt-4">
  <form method="POST" action="?/add" class="px-4 py-4 shadow-lg rounded-lg border">
    <div class="mt-1 mb-2">
      <label for="task" class="block text-lg font-medium text-gray-700"
        >Task:</label
      >
      <input
        id="task"
        name="task"
        type="text"
        placeholder="enter a task"
        bind:value={task}
        required
        class="px-1 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
      />
    </div>
    <fieldset>
      <legend>Enter the priority:</legend>
      <div class="flex flex-col gap-1">
        <label>
          <input
            type="radio"
            name="priority"
            value="high"
            class="mx-1 mt-1"
            bind:group={priority}
            required
          />
          High
        </label>

        <label>
          <input
            type="radio"
            name="priority"
            value="medium"
            class="mx-1"
            bind:group={priority}
          />
          Medium
        </label>

        <label>
          <input
            type="radio"
            name="priority"
            value="low"
            class="mx-1"
            bind:group={priority}
          />
          Low
        </label>
      </div>
    </fieldset>
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
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
      </div>
    {/each}
  </div>
</div>
