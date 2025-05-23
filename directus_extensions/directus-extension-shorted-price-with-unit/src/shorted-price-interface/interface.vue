<script setup lang="ts">
import { ref, computed, watch } from "vue";

type Choice = {
  text: string;
  value: number;
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

const emit = defineEmits(["input"]);

const items = computed(() => props.choices || []);
const currentValue = computed(() => Number(props.value));
const currentPair = computed(() => {
  if (items.value.length === 0) {
    return {
      unit: "1",
      shortedPrice: currentValue.value,
    };
  }
  const item = items.value.find(
    (item) => Number(item.value) <= currentValue.value
  );
  return item
    ? {
        unit: item.value.toString(),
        shortedPrice: currentValue.value / item.value,
      }
    : {
        unit: "1",
        shortedPrice: currentValue.value,
      };
});

const unitValue = ref(currentPair.value.unit);
const shortedPriceValue = ref(currentPair.value.shortedPrice);

const fullPriceValue = computed(() => {
  return Number(shortedPriceValue.value) * Number(unitValue.value);
});

watch(
  () => currentPair.value,
  (newValue) => {
    unitValue.value = newValue.unit;
    shortedPriceValue.value = newValue.shortedPrice;

    console.log(`newValue: ${newValue}`);
    console.log(`items: `, items.value);
    console.log(`currentPair: `, currentPair.value);
    console.log(`unitValue: ${unitValue.value}`);
    console.log(`shortedPriceValue: ${shortedPriceValue.value}`);
    console.log("--------------------------------");
  }
);

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  const newValue = Number(target?.value ?? 0);
  shortedPriceValue.value = newValue;
  emit("input", fullPriceValue.value);
}

function handleSelect(newValue: string): void {
  unitValue.value = newValue;
  emit("input", fullPriceValue.value);
}
</script>

<template>
  <div class="price-input-container">
    <VInput
      type="number"
      step="any"
      v-model="shortedPriceValue"
      @input="handleChange($event)"
    />
    <div class="price-unit-select">
      <VSelect
        v-if="items.length > 0"
        v-model="unitValue"
        :items="items"
        item-text="text"
        item-value="value"
        :allow-other="false"
        :show-deselect="false"
        @update:model-value="handleSelect"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
.price-input-container {
  display: flex;
  gap: 10px;
}

.price-unit-select {
  width: 300px !important;
}

.remaining {
  display: none;
  width: 24px;
  color: var(--theme--form--field--input--foreground-subdued);
  font-weight: 600;
  text-align: right;
  vertical-align: middle;
  font-feature-settings: "tnum";
}

.v-input:focus-within .remaining {
  display: block;
}

.v-input:focus-within .hide {
  display: none;
}

.warning {
  color: var(--theme--warning);
}

.danger {
  color: var(--theme--danger);
}
</style>
