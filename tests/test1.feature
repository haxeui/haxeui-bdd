@remoting
Feature: Ensure remoting works

  Background:
    Given I have a connection
  
  @button1
  Scenario: Make sure button 1 works
    When I click the "Button 1" button
    Then the text of testField1 should be "Set from script!"
    And the text of mainLabel should be "Button 1 clicked!"
    And I do something
  
  @button2
  Scenario: Make sure button 2 works
    When I click the "Button 2" button
    Then the text of testField2 should be "Set from code!"
    And the text of mainLabel should be "Button 2 clicked!"
    And I do something
