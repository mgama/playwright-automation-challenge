import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { ProjectPage } from '../pages/project-page';
import { ProjectTasksPage } from '../pages/project-tasks/project-tasks-page';

test.describe('Project Tasks Smoketests', async() => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let projectPage: ProjectPage;
    let projectTasksPage: ProjectTasksPage;
    let newTaskTitle: '';

    test.beforeEach(async({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        projectPage = new ProjectPage(page);
        projectTasksPage = new ProjectTasksPage(page);

        await loginPage.login();

        await expect(homePage.newProjectButton).toBeVisible();

        await homePage.goToProject('Sample project - JBO 6');

        await expect(projectPage.fieldManagementTasks).toBeVisible();

        await projectPage.fieldManagementTasks.click();

        newTaskTitle = 'Test task ' + Math.random().toString(36).substring(2,7);
    })

    test('Create a New Priority One Task using Task Column', async () => {

        await test.step('Verify the New Task buttons of each Task Column are visible', async() => {
            await expect(projectTasksPage.newTaskHeaderButton).toBeVisible();
            await expect(projectTasksPage.priorityOneTaskColumn).toBeVisible();
            await expect(projectTasksPage.priorityOneNewTask).toBeVisible();
            await expect(projectTasksPage.priorityTwoNewTask).toBeVisible();
            await expect(projectTasksPage.priorityThreeNewTask).toBeVisible();
        });

        await test.step('Add a new Priority 1 Task using the New Task button under the Priority 1 column', async() => { 
            await projectTasksPage.priorityOneNewTask.click();

            await expect(projectTasksPage.newTaskTitleInput).toBeEnabled();
            await expect(projectTasksPage.newTaskSubmitButton).toBeVisible();
            await expect(projectTasksPage.newTaskSubmitButton).toBeDisabled();
            await expect(projectTasksPage.newTaskCancelButton).toBeEnabled();

            //Enter new Priority 1 task
            await projectTasksPage.newTaskTitleInput.fill(newTaskTitle);
            
            await expect(projectTasksPage.newTaskSubmitButton).toBeEnabled();
            await expect(projectTasksPage.newTaskCancelButton).toBeEnabled();

            await projectTasksPage.newTaskSubmitButton.click();

            await expect(projectTasksPage.newTaskSubmitButton).toBeHidden();
            await expect(projectTasksPage.newTaskCancelButton).toBeHidden();
        });

        await test.step('Verify the new Priority 1 task created is shown in the Task Page column for Priority 1', async() => {
            const newTaskCreated = await projectTasksPage.findTaskByTitleAndColumn(newTaskTitle, 'Priority 1');
            await expect(newTaskCreated).toBeAttached();
            await expect(newTaskCreated).toBeVisible();
        });
    });

    test('Create a New Priority Two Task using Task Column and delete the task', async () => {
        await test.step('Add a new Priority 2 Task using the New Task button under the Priority 2 column', async() => {
            await expect(projectTasksPage.newTaskHeaderButton).toBeVisible();
            await expect(projectTasksPage.priorityTwoTaskColumn).toBeVisible();

            await projectTasksPage.priorityTwoNewTask.click();
            await projectTasksPage.newTaskTitleInput.fill(newTaskTitle);
            await projectTasksPage.newTaskSubmitButton.click();

            await expect(projectTasksPage.newTaskSubmitButton).toBeHidden();
            await expect(projectTasksPage.newTaskCancelButton).toBeHidden();
        });

        await test.step('Verify the new Priority 2 task created is shown in the Task Page column for Priority 1', async() => {
            const newTaskCreated = await projectTasksPage.findTaskByTitleAndColumn(newTaskTitle, 'Priority 2');
            await expect(newTaskCreated).toBeVisible({timeout: 10000});
        });

        await test.step('Delete the newly Priority 2 task created by selecting it and doing a Delete Action via the Actions Header dropdown', async() => {
            await projectTasksPage.deleteTaskByTitle(newTaskTitle);

            await expect(projectTasksPage.modalDeleteButton).toBeHidden();

            const newTaskDeleted = await projectTasksPage.findTaskByTitleAndColumn(newTaskTitle, 'Priority 2');
            await expect(newTaskDeleted).toBeHidden();
        });
    });

    test('Create a New Priority 3 Task using Edit/Create Task Modal', async () => {
        const newTask = {
            name: newTaskTitle,
            status: 'Priority 3',
        };

        await test.step('Add a new Priority 3 Task using the Edit/Create Task Modal', async() => {
            //Enter new task using the Tasks Edit Modal
            await projectTasksPage.newTaskHeaderButton.click();

            await expect(projectTasksPage.tasksEditModal.modal).toBeAttached();

            await projectTasksPage.tasksEditModal.createTask(newTask);

            await expect(projectTasksPage.tasksEditModal.editTaskName).toHaveText(' ' + newTask.name + ' edit');
            await expect(projectTasksPage.tasksEditModal.editTaskNameCheckButton).toBeHidden();
            await expect(projectTasksPage.tasksEditModal.editTaskNameCancelButton).toBeHidden();
            await expect(projectTasksPage.tasksEditModal.taskStatusDropdown.statusLabel).toHaveText(newTask.status);

            await projectTasksPage.tasksEditModal.closeModalButton.click();

            await expect(projectTasksPage.tasksEditModal.modal).toBeHidden();
        });

        await test.step('Verify the new Priority 3 task created is shown in the Task Page column for Priority 3', async() => {
            const newTaskCreated = await projectTasksPage.findTaskByTitleAndColumn(newTask.name, newTask.status);
            await expect(newTaskCreated).toBeVisible({timeout: 10000});
        });
    });

    test('Create a New Completed Task using Edit/Create Task Modal and Delete Task using Modal', async ({ page }) => {
        const newTask = {
            name: newTaskTitle,
            status: 'Completed',
        };

        await test.step('Add a new Priority 3 Task using the Edit/Create Task Modal', async() => {
            await projectTasksPage.newTaskHeaderButton.click();

            await expect(projectTasksPage.tasksEditModal.modal).toBeAttached();

            await projectTasksPage.tasksEditModal.createTask(newTask);

            await expect(projectTasksPage.tasksEditModal.editTaskName).toHaveText(' ' + newTask.name + ' edit');
            await expect(projectTasksPage.tasksEditModal.editTaskNameCheckButton).toBeHidden();
            await expect(projectTasksPage.tasksEditModal.editTaskNameCancelButton).toBeHidden();
            await expect(projectTasksPage.tasksEditModal.taskStatusDropdown.statusLabel).toHaveText(newTask.status);

            await projectTasksPage.tasksEditModal.closeModalButton.click();

            await expect(projectTasksPage.tasksEditModal.modal).toBeHidden();

        });

        await test.step('Verify the new Completed task created is shown in the Task Page column for Completed', async() => {
            const newTaskCreated = await projectTasksPage.findTaskByTitleAndColumn(newTask.name, newTask.status);
            await expect(newTaskCreated).toBeAttached();
            await expect(newTaskCreated).toBeVisible();

            await newTaskCreated.click();
        });

        await test.step('Open the task from the Task Column and delete the task via the Edit Task Modal', async() => {
            await expect(projectTasksPage.tasksEditModal.modal).toBeVisible();
            await expect(projectTasksPage.tasksEditModal.taskStatusDropdown.statusLabel).toHaveText('Completed');

            await projectTasksPage.tasksEditModal.taskStatusDropdown.selectStatus('Delete Task');

            await expect(projectTasksPage.tasksEditModal.modal).toBeHidden({timeout: 10000});
        });

        await test.step('Verify the task does not show on the Tasks Columns', async() => {
            const newTaskDeleted = await projectTasksPage.findTaskByTitleAndColumn(newTask.name, newTask.status);
            await expect(newTaskDeleted).toBeHidden();
        });
    })

    test('Create a New Completed Task using Task Column and update the task status to completed via Edit/Create Task Modal', async () => {
        await test.step('Add a new Completed Task using the New Task button under the Completed column', async() => {
            await projectTasksPage.completedNewTask.click();
            await projectTasksPage.newTaskTitleInput.fill(newTaskTitle);
            await projectTasksPage.newTaskSubmitButton.click();

            await expect(projectTasksPage.newTaskSubmitButton).toBeHidden();
            await expect(projectTasksPage.newTaskCancelButton).toBeHidden();
        });

        await test.step('Verify the new Completed task created is shown in the Task Page column for Completed', async() => {
            const newTaskCreated = await projectTasksPage.findTaskByTitleAndColumn(newTaskTitle, 'Completed');
            await expect(newTaskCreated).toBeAttached();
            await expect(newTaskCreated).toBeVisible();

            await newTaskCreated.click();
        });

        await test.step('Update the newly created task to be of status Verified using the Edit/Create Task Modal', async() => {
            await expect(projectTasksPage.tasksEditModal.modal).toBeVisible();
            await expect(projectTasksPage.tasksEditModal.taskStatusDropdown.statusLabel).toHaveText('Completed');

            await projectTasksPage.tasksEditModal.taskStatusDropdown.selectStatus('Verified');
            await projectTasksPage.tasksEditModal.closeModalButton.click();

            await expect(projectTasksPage.tasksEditModal.modal).toBeHidden();
        });

        await test.step('Verify the status of the task on the Task Columns view and in the Edit/Create Task Modal', async() => {
            const newTaskUpdated = await projectTasksPage.findTaskByTitleAndColumn(newTaskTitle, 'Verified');
            await expect(newTaskUpdated).toBeVisible();

            //Verify the status on the Edit/Create Task Modal is also updated properly
            await newTaskUpdated.click();

            await expect(projectTasksPage.tasksEditModal.modal).toBeVisible();
            await expect(projectTasksPage.tasksEditModal.taskStatusDropdown.statusLabel).toHaveText('Verified');
        });
    });

});