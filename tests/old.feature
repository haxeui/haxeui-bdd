@tag1
Feature: Fake database feature

  Background: Ensure DB is in known state
    Given that the record id0001 does not exist
  
  @tag2  
  Scenario: Ensure single scenario record create
    When I add a record with the following details:
        | id    | id0001 |
        | name  | name1  |
        | value | value1 |
    Then a record with the following details should exist:
        | id    | id00011 |
        | name  | name1  |
        | value | value1 |
    # just tests    
    Then the record id0001 should not exist        
    And the record id0001 should not exist        
    And the record id0001 should not exist        
    
  @tag2  
  Scenario: Ensure single scenario record delete
    When I add a record with the following details:
        | id    | id0001 |
        | name  | name1  |
        | value | value1 |
    And I delete the record id0001
    Then the record id0001 should not exist
    
  @tag2  
  Scenario: Ensure single scenario record update
    When I add a record with the following details:
        | id    | id0001 |
        | name  | name1  |
        | value | value1 |
    And I set the last added record to:
        | name  | name2  |
        | value | value2 |
    Then a record with the following details should exist:
        | id    | id0001 |
        | name  | name2  |
        | value | value2 |

  @tag3
  Scenario Outline: Ensure scenario outline record create
    Given that the record <id> does not exist
    When I add a record with the following details:
        | id    | <id>    |
        | name  | <name>  |
        | value | <value> |
    Then a record with the following details should exist:
        | id    | <id>    |
        | name  | <name>  |
        | value | <value> |
    Examples:
        | id     | name  | value  |
        | id0001 | name1 | value1 |
        | id0002 | name2 | value2 |
        | id0003 | name3 | value3 |
        
  @tag3
  Scenario Outline: Ensure scenario outline record delete
    Given that the record <id> does not exist
    When I add a record with the following details:
        | id    | <id>    |
        | name  | <name>  |
        | value | <value> |
    And I delete the record <id>        
    Then the record <id> should not exist
    Examples:
        | id     | name  | value  |
        | id0001 | name1 | value1 |
        | id0002 | name2 | value2 |
        | id0003 | name3 | value3 |
    
  @tag3
  Scenario Outline: Ensure scenario outline record update
    Given that the record <id> does not exist
    When I add a record with the following details:
        | id    | <id>    |
        | name  | <name>  |
        | value | <value> |
    And I set the <id> record to:        
        | name  | <new name>  |
        | value | <new value> |
    Then a record with the following details should exist:
        | id    | <id>        |
        | name  | <new name>  |
        | value | <new value> |
    Examples:
        | id     | name  | value  | new name     | new value     |
        | id0001 | name1 | value1 | edited name1 | edited value1 |
        | id0002 | name2 | value2 | edited name2 | edited value2 |
        | id0003 | name3 | value3 | edited name3 | edited value3 |
        