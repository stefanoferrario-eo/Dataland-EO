<template>
  <div class="form-field" :data-test="name">
    <UploadFormHeader :label="label" :description="description" :is-required="required" />
    <FormKit
      type="text"
      :name="name"
      :validation-label="validationLabel ?? label"
      :validation="`number|${validation}`"
      :placeholder="placeholder"
      :inner-class="innerClass"
    />
  </div>
</template>

<script lang="ts">
import UploadFormHeader from "@/components/forms/parts/elements/basic/UploadFormHeader.vue";
import { defineComponent } from "vue";
import { FormKit } from "@formkit/vue";
import { FormFieldPropsWithPlaceholder } from "@/components/forms/parts/fields/FormFieldProps";

export default defineComponent({
  name: "NumberFormField",
  components: { FormKit, UploadFormHeader },
  props: FormFieldPropsWithPlaceholder,
});
</script>
