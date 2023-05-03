## <-- Place the Title Here -->

# Status – 

# Summary

<-- A 1-2 line summary of the feature and the purpose of the test plan. --> 

# Reviewers
| Role               | Reviewers | Approved |
|--------------------|-----------|----------|
| Feature Dev(s)     |           |          |
| Dev Lead / Dev Mgr |           |          |
| Product Manager    |           |          |
| QA Manager         |           |          |



# Open issues or questions

| Status | Issue / Question | Notes |
|--------|------------------|-------|
|        |                  |       |


# Bugs 



# Scope

<--Define in-scope and out of scope testing.  Ex. All API, and UI functional changes. Out of scope is direct DB testing and scenarios consumed by Device Trust team.

If any other test plan captures features out of scope please mention. -->

# Out of Scope / Known Gaps

<-- Please list all the out of scope tests for this test plan. -->

# Kill Switch & Feature Flags

**Feature Flag** = 

What new kill switches and feature flags are being introduced?

What interactions with existing kill switches and feature flags need to be considered? Add a coverage matrix if needed

Possible impact of new FFs to existing orgs

New FF compatibility and incompatibility with existing FFs .Talk to dev or PM to understand what are other FF turning on (flags in EA ) can impact the feature.

Possible data integrity issue when toggling the new FFs

Any specific config changes or test requirements for existing and new orgs for new FFs

What kill switches and Feature flags to be turned off as part of release?

# Risks 

Identify any risks for the testing( eg:one-way feature flags, data deletion, data corruption, replication lag, SAFE_MODE/READ_ONLY compatible, what happens when jobs fail, what happens when an app is restarted, external dependencies, library dependencies, rollback, ERI compatible, kill switches)

Please refer to the document [Test Strategy - Risky, Complex or Pervasive Changes to Services](https://oktawiki.atlassian.net/wiki/spaces/eng/pages/233433324) to see if there are any risky changes for the feature.

# Definition of Done



What are the criteria for moving this feature to Beta, and EA/GA.Please refer the wiki for guide lines.  Ex. Definition of Done for Identity Management Realm.  

- [ ] All test classes complete

- [ ] P0 - P2 bugs resolved.

- [ ] All “GA Blocking” Dev Tasks complete.


# Test Scenarios

# Test Environments

<-- Create a bulleted list of the provided test enviornments -->

# Testability

What needs to be in place to be able to properly test this feature?  Ie. Do additional internal endpoints need to be added? 

# Test Data

Any specialized test data setup needed

# Feature Testing

| Test Number | Test Scenario | Priority | Automation Status | Test Steps | Expected Result | Execution Results | Bugs | Comments |
|-------------|---------------|----------|-------------------|------------|-----------------|-------------------|------|----------|


Note: 

Document Splunk queries, SQL queries, etc for validating the test case results as needed

Add tests for all below functional and non-functional areas. If not applicable, mark N/A.

Test scenarios should high level; provide links to test cases if in test rail

# Observations
<-- Do not touch this section. Leave it alone. Do not populate data in the table below. -->
Document additional knowledge for future reference if relevant.

| Configuration | Notes | Status |
|---------------|-------|--------|
|               |       |        |


# Test Areas

Functional Tests

Backward compatibility: Tests to ensure new version of the product to continue to work with the older product

Upgrade Testing: Tests to ensure upgrade to the latest version of the product

E2E/Integration: Tests to ensure the flow of an application right from start to finish behaves as expected

Multilingual UX/UI: Tests to ensure that code and data formats (internationalization), experience/local fit (localization), and communication (translation) are as expected. See 

Rollback:  Tests to ensure rollback of the FF works as expected

Migration: Tests to compare migrated data with original data to discover any discrepancies with pre or post-migration scripts. 

DB Schema / Data Integrity: Tests to ensure schema, tables, triggers, etc. of the Database under test. Also checks data integrity and consistency

SSO: Tests to ensure SSO workflows are working fine

Job/ Batch Job: Tests to ensure jobs framework works fine 

Safe Mode: Tests to ensure system goes in safe mode and works

Okta-Mastered vs 3rd-Party Mastered: Tests to ensure how feature works when applications are okta mastered or 3rd party mastered

API: Tests to ensure correctness of responses and data for APIs

Agents: Tests to ensure feature works with different agents (eg:AD,LDAP)

Impacted Browsers: Tests to ensure feature works with different browsers (eg:FF,Safari)

UI Based: Tests with all the dropdowns/radio boxes .Check that any other FF has any effect on the UI features

Dependency tests: If there is a dependency ,run the automated  tests for the dependent teams too.

Non-Functional Tests

Install/Uninstall Testing: Tests to ensure software install /uninstall  process works as expected.

Availability/Reliability: Tests to ensure system or component that is operational without interruption for long periods of time. Also, ensure that the quality and durability is consistent with specifications throughout the intended lifecycle.

Scalability/Performance: Tests to ensure scala and performance are measured for feature and system in context - number of user requests, load tests (10k, 50k,100k transactions/min) CPU/HEAP/Mem Util, etc

Deployment: Tests to ensure software deployment process works as expected

# Post Rollout Validation

Plan for post rollout monitoring and validation to ensure there are no errors or customer impact. 

# Related Links

Add applicable Product PM Spec, One-Pagers, UI/UX Mocks, Documentation that may help anyone from Okta understand this feature better.