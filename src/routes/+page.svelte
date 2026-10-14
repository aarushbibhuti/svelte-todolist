<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let task = $state("");
  let priority = $state("");
  let taskFilter = $state("all");
  let taskSort = $state("priority");
  let editingId = $state<number | null>(null);
  let editTask = $state("");
  let editPriority = $state("");

  let visibleTodos = $derived.by(() => {
    const filteredTodos = data.todos.filter((todo) => {
      if (taskFilter === "active") return !todo.completed;
      if (taskFilter === "completed") return todo.completed;
      return true;
    });

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return filteredTodos.toSorted((a, b) => {
      if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
      if (taskSort === "priority") {
        return (
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
        );
      }
      return 0;
    });
  });

  function startEditing(currentTask: PageData["todos"][number]) {
    editingId = currentTask.id;
    editTask = currentTask.task;
    editPriority = currentTask.priority;
  }

  function cancelEditing() {
    editingId = null;
  }
</script>

<header
  class="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 lg:px-6"
>
  <h1 class="text-xl font-semibold tracking-tight text-slate-900">
    svelte todolist <span class="font-normal text-slate-500">/ aarushbib</span>
  </h1>
  <p class="text-sm tabular-nums text-slate-500">
    {data.todos.length}
    {data.todos.length === 1 ? "task" : "tasks"}
  </p>
</header>
<main class="flex flex-col gap-6 p-4 lg:flex-row lg:items-start lg:p-6">
  <aside class="w-full shrink-0 lg:w-72">
    <form
      method="POST"
      action="?/add"
      use:enhance
      class={[
        "w-full px-5 py-5 rounded-xl transition-colors border bg-white shadow-sm",
        {
          "border-red-500": priority === "high",
          "border-yellow-500": priority === "medium",
          "border-green-500": priority === "low",
        },
        { "border-slate-200": priority === "" },
      ]}
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
          class="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 shadow-sm placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
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

          <label
            class="flex cursor-pointer items-center gap-3 rounded-md
           border border-slate-200 px-3 py-2.5
           text-sm text-slate-700 transition-colors
           hover:bg-yellow-100"
          >
            <input
              type="radio"
              name="priority"
              value="medium"
              class="accent-slate-800"
              bind:group={priority}
            />
            Medium
          </label>

          <label
            class="flex cursor-pointer items-center gap-3 rounded-md
           border border-slate-200 px-3 py-2.5
           text-sm text-slate-700 transition-colors
           hover:bg-green-100"
          >
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
  </aside>

  <section
    class="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    <div class="col-span-full flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <label for="task-filter" class="text-sm font-medium text-slate-700">
          Show
        </label>
        <select
          id="task-filter"
          bind:value={taskFilter}
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="all">All tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label for="task-sort" class="text-sm font-medium text-slate-700">
          Sort
        </label>
        <select
          id="task-sort"
          bind:value={taskSort}
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="priority">Priority: high to low</option>
          <option value="created">Original order</option>
        </select>
      </div>
    </div>

    {#each visibleTodos as currentTask (currentTask.id)}
      <div
        class={[
          "border-2 p-5 rounded-sm shadow-md",
          {
            "border-red-500 bg-red-50": currentTask.priority === "high",
            "border-yellow-500 bg-yellow-50": currentTask.priority === "medium",
            "border-green-500 bg-green-50": currentTask.priority === "low",
          },
        ]}
      >
        {#if editingId === currentTask.id}
          <form method="POST" action="?/edit" use:enhance class="mt-4 space-y-3">
            <input type="hidden" name="id" value={currentTask.id} />

            <label class="block text-sm font-medium text-slate-700">
              Task
              <input
                name="task"
                type="text"
                bind:value={editTask}
                required
                class="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-2"
              />
            </label>

            <label class="block text-sm font-medium text-slate-700">
              Priority
              <select
                name="priority"
                bind:value={editPriority}
                required
                class="mt-1 w-full rounded-sm border border-slate-300 bg-white px-3 py-2"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>

            <div class="flex justify-end gap-2">
              <button
                type="button"
                onclick={cancelEditing}
                class="rounded-sm px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white/70"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-sm bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Save
              </button>
            </div>
          </form>
        {:else}
          <p class={[
            "text-lg font-semibold",
            { "line-through text-slate-500": currentTask.completed },
          ]}>{currentTask.task}</p>
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
          <div class="mt-4 flex items-center justify-between border-t border-slate-900/10 pt-3">
            <button
              type="button"
              onclick={() => startEditing(currentTask)}
              class="rounded-sm px-2 py-1 text-sm font-medium text-slate-600 hover:bg-white/70 hover:text-slate-900"
            >
              Edit
            </button>
            <form method="POST" action="?/setCompleted" use:enhance>
              <input type="hidden" name="id" value={currentTask.id} />
              <input
                type="hidden"
                name="completed"
                value={currentTask.completed ? "false" : "true"}
              />
              <button
                type="submit"
                class="rounded-sm px-2 py-1 text-sm font-medium text-slate-600 hover:bg-white/70"
              >
                {currentTask.completed ? "Reopen" : "Mark complete"}
              </button>
            </form>
            <form method="POST" action="?/delete" use:enhance>
              <input type="hidden" name="id" value={currentTask.id} />
              <button
                type="submit"
                aria-label={`Delete ${currentTask.task}`}
                class="inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-sm font-medium text-slate-500 transition-colors hover:bg-white/70 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h12m-10 0 .6 10h6.8L14 6M8 6V4h4v2m-3 3v4m2-4v4"
                  />
                </svg>
                Remove
              </button>
            </form>
          </div>
        {/if}
      </div>
    {:else}
      <div
        class="col-span-full border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center"
      >
        <p class="text-sm font-medium text-slate-700">
          Nothing on the list yet.
        </p>
        <p class="mt-1 text-sm text-slate-500">
          Add a task from the form to get started.
        </p>
      </div>
    {/each}
  </section>
</main>
