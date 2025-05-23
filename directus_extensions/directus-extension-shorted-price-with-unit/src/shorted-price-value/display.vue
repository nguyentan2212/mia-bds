<template>
  <div class="display-labels">
    <v-chip
      v-if="choice"
      :style="{
        '--v-chip-color': choice.foreground,
        '--v-chip-background-color': choice.background,
      }"
      small
      disabled
      label
    >
      {{ choice.text }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type Choice = {
  value: number;
  text: string;
  foreground: string | null;
  background: string | null;
};

const props = withDefaults(
  defineProps<{
    value: number;
    choices?: Choice[];
  }>(),
  {
    choices: () => [],
  }
);

const displayValue = ref<number | undefined>(props.value);

const choice = computed(() => {
  let item =
    props.choices.length === 0 || !displayValue.value
      ? undefined
      : props.choices.find(
          (c) => Number(c.value) <= Number(displayValue.value)
        );

  if (item) {
    item = {
      value: item.value,
      text: `${Number(displayValue.value) / item.value} ${item.text}`,
      foreground: item.foreground ?? "var(--theme--foreground)",
      background: item.background ?? "var(--theme--background-normal)",
    };
  } else {
    item = {
      value: 1,
      text: displayValue.value?.toString() ?? "",
      foreground: "var(--theme--foreground)",
      background: "var(--theme--background-normal)",
    };
  }

  return item;
});
</script>

<style scoped lang="css">
.display-labels {
  display: inline-flex;
}
</style>
