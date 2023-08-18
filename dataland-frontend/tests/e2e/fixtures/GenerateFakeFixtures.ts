import { exportFixturesEuTaxonomyFinancial } from "./eutaxonomy/financials";
import { exportFixturesEuTaxonomyNonFinancial } from "./eutaxonomy/non-financials";
import { exportFixturesLksg } from "./lksg";
import { exportFixturesSfdrData } from "./sfdr";
import { exportFixturesSme } from "./sme";
import { exportFixturesP2p } from "@e2e/fixtures/p2p";
import { exportFixturesNewEuTaxonomyForNonFinancials } from "@e2e/fixtures/eutaxonomy/new-non-financials";

/**
 * The main entrypoint of the fake fixture generator
 */
function main(): void {
  exportFixturesEuTaxonomyFinancial();
  exportFixturesEuTaxonomyNonFinancial();
  exportFixturesNewEuTaxonomyForNonFinancials();
  exportFixturesLksg();
  exportFixturesSfdrData();
  exportFixturesSme();
  exportFixturesP2p();
}

main();
