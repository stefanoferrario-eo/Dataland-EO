// main

val jacocoVersion: String by project
val ktlintVersion: String by project
val githubUser: String by project
val githubToken: String by project

allprojects {
    repositories {
        mavenCentral()
    }
}

subprojects {
    apply(plugin = "io.spring.dependency-management")
    apply(plugin = "org.jlleitschuh.gradle.ktlint")
    apply(plugin = "com.github.ben-manes.versions")
    apply(plugin = "com.github.jk1.dependency-license-report")

    group = "org.dataland"
    version = "0.0.1-SNAPSHOT"
    tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict", "-opt-in=kotlin.RequiresOptIn")
            jvmTarget = "17"
        }
    }
    sonar {
        isSkipProject = true
    }
    ktlint {
        version.set(ktlintVersion)
    }
}

tasks.dependencyUpdates.configure {
    gradleReleaseChannel = "current"
}

dependencies {
    detekt("io.gitlab.arturbosch.detekt:detekt-cli:1.23.1")
    detekt("org.jetbrains.kotlin:kotlin-compiler-embeddable:1.8.21")
}

java.sourceCompatibility = JavaVersion.VERSION_17

plugins {
    id("com.github.jk1.dependency-license-report") version "2.5"
    id("io.gitlab.arturbosch.detekt") version "1.23.0"
    id("com.github.node-gradle.node") version "5.0.0" apply false
    id("org.springframework.boot") version "3.1.1" apply false
    id("org.jlleitschuh.gradle.ktlint") version "11.5.0"
    kotlin("jvm") version "1.9.0"
    kotlin("plugin.spring") version "1.9.0" apply false
    id("org.sonarqube") version "4.3.0.3225"
    jacoco
    id("org.springdoc.openapi-gradle-plugin") version "1.7.0" apply false
    id("com.gorylenko.gradle-git-properties") version "2.4.1" apply false
    id("org.openapi.generator") version "6.6.0" apply false
    id("com.github.ben-manes.versions") version "0.47.0"
    id("org.jetbrains.kotlin.plugin.jpa") version "1.9.0" apply false
    kotlin("plugin.serialization") version "1.9.0" apply false
}

sonar {
    properties {
        property("sonar.projectKey", "d-fine_Dataland")
        property("sonar.organization", "d-fine")
        property("sonar.host.url", "https://sonarcloud.io")
        property("sonar.coverage.jacoco.xmlReportPaths", file("$buildDir/reports/jacoco/test/jacocoTestReport.xml"))
        property("sonar.qualitygate.wait", true)
        property("sonar.javascript.lcov.reportPaths", fileTree("$projectDir/fe-coverage").files)
        property(
            "sonar.coverage.exclusions",
            "**/test/**," +
                "**/tests/**," +
                "**/LocalCorsConfig.kt," +
                "dataland-frontend/src/main.ts",
        )
        property(
            "sonar.sources",
            subprojects.flatMap { project -> project.properties["sonarSources"] as Iterable<*> },
        )
        property("sonar.verbose", "true")
        property("sonar.scanner.metadataFilePath", "$projectDir/build/reports/report_task.txt")
        property(
            "sonar.cpd.exclusions",
            "dataland-frontend/src/components/forms/parts/elements/derived/NaceCodeTree.ts," +
                "dataland-frontend/src/components/resources/frameworkDataSearch/lksg/LksgDataModel.ts," +
                "dataland-backend/src/main/kotlin/db/migration/V1_1__CreateBackendTables.kt," +
                "dataland-frontend/src/components/resources/frameworkDataSearch/p2p/P2pDataModel.ts," +
                "dataland-frontend/src/components/resources/frameworkDataSearch/sfdr/SfdrDataModel.ts," +
                "dataland-frontend/src/components/resources/frameworkDataSearch/sme/SmeDataModel.ts",
        )
        property(
            "sonar.exclusions",
            "dataland-backend/src/main/kotlin/" +
                "org/dataland/datalandbackend/model/enums/eutaxonomy/nonfinancials/Activity.kt",
        )
    }
}

jacoco {
    toolVersion = jacocoVersion
}

tasks.jacocoTestReport {
    dependsOn(tasks.build)
    dependsOn(subprojects.flatMap { it.tasks.filter { it.name == "compileKotlin" } })
    sourceDirectories.setFrom(
        subprojects.flatMap { project -> project.properties["jacocoSources"] as Iterable<*> },
    )
    classDirectories.setFrom(
        subprojects.flatMap { project -> project.properties["jacocoClasses"] as Iterable<*> },
    )
    reports {
        xml.required.set(true)
        csv.required.set(false)
    }
    executionData.setFrom(fileTree("$projectDir") { include("**/*.exec") }.files)
}

detekt {
    buildUponDefaultConfig = true
    allRules = false
    config.setFrom("$projectDir/config/detekt.yml")
    baseline = file("$projectDir/config/baseline.xml")
    val detektFileTree = fileTree("$projectDir")
    detektFileTree.exclude("**/build/**").exclude("**/node_modules/**").exclude(".gradle")
    source.setFrom(detektFileTree)
}

tasks.withType<io.gitlab.arturbosch.detekt.Detekt>().configureEach {
    reports {
        html.required.set(true)
        xml.required.set(true)
        txt.required.set(true)
        sarif.required.set(true)
    }
    jvmTarget = java.sourceCompatibility.toString()
}
tasks.withType<io.gitlab.arturbosch.detekt.DetektCreateBaselineTask>().configureEach {
    jvmTarget = java.sourceCompatibility.toString()
}

ktlint {
    version.set(ktlintVersion)
}
