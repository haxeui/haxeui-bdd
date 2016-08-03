@simulation
Feature: Ensure mouse simulation works

  Background:
    
  @mouse  
  Scenario: Ensure I can write my name
    When I move the mouse from 200,20 to 200,200
    And I move the mouse from 210,200 to 270,20
    And I move the mouse from 270,20 to 330,200
    And I move the mouse from 235,120 to 300,120
    And I move the mouse from 340,200 to 340,20
    And I move the mouse from 340,20 to 420,200
    And I move the mouse from 420,200 to 421,20
    

  @keyboard  
  Scenario: Ensure I can type in the text field
    When I click on 30,30
    And I type "Test text!"
    And I wait for 2 seconds
  
    