<template>
  <section v-if="brandsSection" class="brands" role="region" aria-label="Brands Statement">
    <div class="brands__wrap">
      <h2 id="brands-heading" aria-labelledby="brands-heading" class="brands__text">
        {{ brandsSection.text[0] }}
        <span>{{ brandsSection.text[1] }}</span>
      </h2>
      <!-- <component :is="brandSvg" v-if="brandSvg"></component> -->

      <div class="brands__list" role="list">
        <div class="brands__item" v-for="(imgSrc, index) in brandsSection.image" :key="index" role="listitem">
          <img :src="imgSrc" :alt="`Brand ${index + 1}`" :class="`brands__item-image brands__item-image--${index}`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, type Ref } from "vue";
import type { Section } from "@/types/ContentTypes";

// const brandSvg: Ref<string | null> = ref(null);
// const brandSvg = await import("/src/assets/images/logos/brands_deka.svg");
const { sections } = defineProps<{ sections?: Section[] }>();

const brandsSection = computed(() => {
  return sections?.find((section) => section.title === "Brands") || null;
});
// onMounted(async () => {
//   const svgModule = await import("/src/assets/images/logos/brands_deka.svg");
//   brandSvg.value = svgModule.default;
// });
</script>

<style scoped lang="scss">
.brands {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  gap: 40px;

  &__wrap {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    gap: 40px 32px;
    max-width: 1440px;
    width: 100%;
    padding: 0 32px;
  }

  &__text {
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: 78px; /* 121.875% */
    text-align: left;
    grid-column: 4 / 11;
    transition:
      font-size 0.4s ease,
      line-height 0.4s ease;
    span {
      color: var(--grey-tones-400);
    }
  }

  &__list {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    max-width: 1440px;
    grid-column: 1 / -1;

    .brands__item {
      width: 190px;
      height: 124px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-image {
        max-width: 190px;
        height: auto;
      }
    }
  }
}

@media only screen and (max-width: $large) {
  .brands {
    &__text {
      font-size: 48px;
      min-width: 420px;
      font-weight: 600;
      line-height: 56px;
      letter-spacing: 0.25px;
      grid-column: 3/13;
      max-width: 500px;
    }
    &__list {
      flex-wrap: wrap;
      width: calc((190px * 3) + (24px * 2)); // Width of 3 items plus two 24px gaps
      justify-content: flex-start;
      gap: 40px 24px;
      grid-column: 3 /15;
    }
  }
}
</style>
