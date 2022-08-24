# USAGE: set github token and user and simply run this script in an ELEVATED! powershell window
# The Script can take quite some time (something like a minute) to complete
# SET to your own value! [Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "", [System.EnvironmentVariableTarget]::User)
# SET to your own value! [Environment]::SetEnvironmentVariable("GITHUB_USER", "", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("BACKEND_DOCKERFILE", "./dataland-backend/DockerfileTest", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("CYPRESS_PREPOPULATE_TIMEOUT_S", "90", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("CYPRESS_PREVISIT_TIMEOUT_S", "90", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("DATALAND_EDC_TOKEN", $env:GITHUB_TOKEN, [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("DATALAND_EDC_USER", $env:GITHUB_USER, [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("DATALAND_SKYMINDERCLIENT_TOKEN", $env:GITHUB_TOKEN, [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("DATALAND_SKYMINDERCLIENT_USER", $env:GITHUB_USER, [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("ELECTRON_EXTRA_LAUNCH_ARGS", "--ignore-connections-limit=preview-dataland.duckdns.org,dev-dataland.duckdns.org,dataland-local.duckdns.org", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("FRONTEND_DOCKERFILE", "./dataland-frontend/DockerfileTest", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("IN_MEMORY", "true", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("INITIALIZE_KEYCLOAK", "false", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_ADMIN", "admin", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_ADMIN_PASSWORD", "admin", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_DB_PASSWORD", "password", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_DOCKERFILE", "./dataland-keycloak/Dockerfile", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_FRONTEND_URL", "https://dataland-local.duckdns.org/keycloak", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_READER_PASSWORD", "test", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_READER_SALT", "6ZN+5rRT/wQcQqvNhXIsfA==", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_READER_VALUE", "qT0vhQ7bQA0OuAlJslpDr421pJQjZWIHxXZYePO9IOVVfZUX+85SwuwVrLgL/9xiW5hjyxlhKqQzUl7xUh+hVQ==", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_UPLOADER_PASSWORD", "test", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_UPLOADER_SALT", "6ZN+5rRT/wQcQqvNhXIsfA==", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("KEYCLOAK_UPLOADER_VALUE", "qT0vhQ7bQA0OuAlJslpDr421pJQjZWIHxXZYePO9IOVVfZUX+85SwuwVrLgL/9xiW5hjyxlhKqQzUl7xUh+hVQ==", [System.EnvironmentVariableTarget]::User)
# If needed set REALDATA to an appropriate value. Beware: If set, not all tests might be visible if E2E tests are startet locally [Environment]::SetEnvironmentVariable("REALDATA", "false", [System.EnvironmentVariableTarget]::User)
# If needed, set to value that can be found in internal wiki [Environment]::SetEnvironmentVariable("SKYMINDER_PW", "${{ secrets.SKYMINDER_PW }}", [System.EnvironmentVariableTarget]::User)# If needed, set to value that can be found in internal wiki [Environment]::SetEnvironmentVariable("SKYMINDER_URL", ""http://skyminder-dummyserver:8080"", [System.EnvironmentVariableTarget]::User)
# If needed, set to value that can be found in internal wiki [Environment]::SetEnvironmentVariable("SKYMINDER_USER", "${{ secrets.SKYMINDER_USER }}", [System.EnvironmentVariableTarget]::User)
# If needed, set to your sonar token [Environment]::SetEnvironmentVariable("SONAR_TOKEN", "${{ secrets.SONAR_TOKEN }}", [System.EnvironmentVariableTarget]::User)
# Only needed in CD.yaml - no need to set locally [Environment]::SetEnvironmentVariable("SSH_PRIVATE_KEY", "${{ secrets.SSH_PRIVATE_KEY }}", [System.EnvironmentVariableTarget]::User)
# Only needed in CD.yaml - no need to set locally [Environment]::SetEnvironmentVariable("TARGETSERVER_HOST_KEYS", "${{ secrets.TARGETSERVER_HOST_KEYS }}", [System.EnvironmentVariableTarget]::User)
# If needed (to test EurDat Integration) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("TARGETSERVER_STARTUP_URL", "${{ secrets.TARGETSERVER_STARTUP_URL }}", [System.EnvironmentVariableTarget]::User)
# If needed (to test EurDat Integration) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("TARGETSERVER_URL", "${{ secrets.TARGETSERVER_URL }}", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("TEASER_COMPANY_PERM_IDS", "4295869227", [System.EnvironmentVariableTarget]::User)
# If needed (to test EurDat Integration) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("TRUSTEE_BASE_URL", "${{ secrets.TRUSTEE_BASE_URL }}", [System.EnvironmentVariableTarget]::User)
# If needed (to test EurDat Integration) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("TRUSTEE_ENVIRONMENT_NAME", "${{ github.event.inputs.trusteeEnvironmentName }}", [System.EnvironmentVariableTarget]::User)
# If needed (to execute CI Tests locally) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("GOOGLE_ACCOUNT_NAME", "#", [System.EnvironmentVariableTarget]::User)
# If needed (to execute CI Tests locally) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("GOOGLE_PASSWORD", "#", [System.EnvironmentVariableTarget]::User)
# If needed (to execute CI Tests locally) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("KEYCLOAK_GOOGLE_ID", "#", [System.EnvironmentVariableTarget]::User)
# If needed (to execute CI Tests locally) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("KEYCLOAK_GOOGLE_SECRET", "#", [System.EnvironmentVariableTarget]::User)
# If needed (to execute CI Tests locally) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("KEYCLOAK_LINKEDIN_ID", "#", [System.EnvironmentVariableTarget]::User)
# If needed (to execute CI Tests locally) - set to Value that can be found in internal wiki [Environment]::SetEnvironmentVariable("KEYCLOAK_LINKEDIN_SECRET", "#", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("PROXY_PRIMARY_URL", "dataland-local.duckdns.org", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("PROXY_LETSENCRYPT_PATH", "/etc/letsencrypt/dataland-local.duckdns.org", [System.EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("PROXY_ENVIRONMENT", "development", [System.EnvironmentVariableTarget]::User)