import SfdrDataTable from "@/components/general/SfdrDataTable.vue";
import { shallowMount } from "@vue/test-utils";

describe("Component test for SfdrDataTable", () => {
  const wrapper = shallowMount(SfdrDataTable);

  it("Check that the initial values are correct", () => {
    expect(wrapper.vm.kpiDataObjects).to.be.an("array").that.is.empty;
    expect(wrapper.vm.reportingPeriodsOfDataSets).to.be.an("array").that.is.empty;
    expect(wrapper.vm.kpiNameMappings).to.be.an("object").that.is.empty;
    expect(wrapper.vm.kpiInfoMappings).to.be.an("object").that.is.empty;
    expect(wrapper.vm.subAreaNameMappings).to.be.an("object").that.is.empty;
  });
});
