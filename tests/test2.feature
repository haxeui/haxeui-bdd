Feature:
    
  Background:
    Given I have a connection
    And I clear the user interface

  Scenario:
    When I create the user interface defined in "tests/test1.xml"
    Then I should see the following components and values:
      | button | Main Button |
      | button | Sub Button  |
    When I click the "Sub Button" button
    Then the text of mainButton should not be "This shouldnt happen if you clicked Sub Button"