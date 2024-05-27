# Canban-Board

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Mock-Up](#mock-up)
- [Repository Link](#repository-link)
- [Deployed Application](#deployed-application)
- [Example Application](#example-application)

## Description
Create a simple task board application that allows a team to manage project tasks by modifying starter code. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Mock-Up

The following animation demonstrates the application functionality:

![The user adds a task according to their request, then can move it to "In Progress" and "Completed," as well as delete the task.](./assets/images/05-third-party-apis-homework-demo.gif)

## Repository Link
[My blog Repository](https://github.com/iKeyToLife/Canban-Board)

## Deployed Application
[My blog Deployed Application](https://ikeytolife.github.io/personal-blog/)

<!-- <!-- ## Example Application -->
![Application Screenshot](./assets/images/preview-project.gif)
![Application Screenshot](./assets/images/preview-project.png) -->