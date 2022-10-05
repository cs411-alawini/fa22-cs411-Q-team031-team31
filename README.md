# Q-team031-team31

This is a template for CS411 project repository. Please make sure that your title follows the convention: Q-[TeamID]-[YourTeamName]. All TeamID should have a three digit coding (i.e. if you are team 20, you should have `team020` as your ID.). You should also make sure that your url for this repository is [fa22-cs411-Q-team000-teamname.git] so TAs can correctly clone your repository and keep them up-to-date.

Once you setup your project, please remember to submit your team formation to the team form.

## Permission

You should make sure you allow TAs to access your repository. You can add TA(s) as a collaborator to your repository.

## Preparing for your release

Eash submission should be in it's own [release](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases). Release are specific freezes to your repository. You should submit your commit hash on canvas or google sheet. When tagging your stage, please use the tag `stage.x` where x is the number to represent the stage.

## Keeping things up-to-date

You should make sure you keep your project root files up-to-date. Information for each file/folders are explained.

## Code Contribution

Individual code contribution will be used to evaluate individual contribution to the project.



# Install python lint
`pip install pre-commit`
This will check the code formatting before every merge.
Please follow the `flake8` linting rules for readability


# Installation for DEV environment
### 1. build docker image
`make build-backend`

### 2. run docker-compose
`docker-compose up`

if you see the following image, you are ready to go
<img width="812" alt="Screen Shot 2022-10-05 at 10 37 50 AM" src="https://user-images.githubusercontent.com/103418311/194102191-cd2c3c82-f965-412a-bcb7-faaa1f449a1e.png">


## Tips
In order to open the Postgresql in the docker, use
`docker exec -it postgres psql -U postgres -P postgres`
