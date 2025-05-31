import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { ProjectPage } from '../pages/project-page';
import { ProjectTasksPage } from '../pages/project-tasks-page';

test('Create a New Priority One Task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const projectPage = new ProjectPage(page);
    const projectTasksPage = new ProjectTasksPage(page);

    await loginPage.login();

    await expect(homePage.newProjectButton).toBeVisible();

    await homePage.goToProject('Sample project - JBO 6');

    await expect(projectPage.fieldManagementTasks).toBeVisible();

    await projectPage.fieldManagementTasks.click();

    await expect(projectTasksPage.priorityOneNewTask).toBeVisible();
    await expect(projectTasksPage.priorityTwoNewTask).toBeVisible();
    await expect(projectTasksPage.priorityThreeNewTask).toBeVisible();

    await projectTasksPage.priorityOneNewTask.click();

    await expect(projectTasksPage.newTaskTitleInput).toBeEnabled();
    await expect(projectTasksPage.newTaskSubmitButton).toBeVisible();
    await expect(projectTasksPage.newTaskSubmitButton).toBeDisabled();
    await expect(projectTasksPage.newTaskCancelButton).toBeEnabled();

    //Enter new task
    const newTaskTitle = 'Test task ' + Math.random().toString(36).substring(2,7);
    await projectTasksPage.newTaskTitleInput.fill(newTaskTitle);
    
    await expect(projectTasksPage.newTaskSubmitButton).toBeEnabled();
    await expect(projectTasksPage.newTaskCancelButton).toBeEnabled();

    await projectTasksPage.newTaskSubmitButton.click();

    await expect(projectTasksPage.newTaskSubmitButton).toBeHidden();
    await expect(projectTasksPage.newTaskCancelButton).toBeHidden();

    const newTaskCreated = await projectTasksPage.findTaskByTitle(newTaskTitle);
    await expect(newTaskCreated).toBeAttached();
    await expect(newTaskCreated).toBeVisible();
});

test('Create a New Priority One Task and delete the task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const projectPage = new ProjectPage(page);
    const projectTasksPage = new ProjectTasksPage(page);

    await loginPage.login();

    await expect(homePage.newProjectButton).toBeVisible();

    await homePage.goToProject('Sample project - JBO 6');
    await projectPage.fieldManagementTasks.click();
    await projectTasksPage.priorityOneNewTask.click();

    //Enter new task
    const newTaskTitle = 'Test task ' + Math.random().toString(36).substring(2,7);
    await projectTasksPage.newTaskTitleInput.fill(newTaskTitle);
    await projectTasksPage.newTaskSubmitButton.click();

    await expect(projectTasksPage.newTaskSubmitButton).toBeHidden();
    await expect(projectTasksPage.newTaskCancelButton).toBeHidden();

    const newTaskCreated = await projectTasksPage.findTaskByTitle(newTaskTitle);
    await expect(newTaskCreated).toBeAttached();
    await expect(newTaskCreated).toBeVisible();

    //Delete the newly created task
    await projectTasksPage.deleteTaskByTitle(newTaskTitle);

    await expect(projectTasksPage.modalDeleteButton).toBeHidden();

    const newTaskDeleted = await projectTasksPage.findTaskByTitle(newTaskTitle);
    await expect(newTaskDeleted).toBeHidden();
});