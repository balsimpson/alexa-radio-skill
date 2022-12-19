<template>
  <!-- <draggable v-model="myArray" group="people" @start="drag = true" @end="drag = false" item-key="id">
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </draggable> -->
  <div>
    <draggable class="list-group" tag="transition-group" :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }" v-model="list" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="order">
      <!-- <template #item="{ element }"> -->
      <template #item="{ element: item }" :key="item.name">
        <li class="list-group-item" >
          {{ item.name }}
        </li>
      </template>
    </draggable>
    <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
const drag = ref(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "group",
    disabled: false,
    ghostClass: "ghost"
  };
})

const list = ref([
  {
    id: 1,
    name: "Baba",
    group: "people"
  },
  {
    id: 2,
    name: "Jaba",
    group: "people"
  },
  {
    id: 3,
    name: "Faba",
    group: "people"
  },
])
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>