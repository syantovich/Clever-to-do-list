# Innowise Lab Internship: Level 1: Clever to-do list

### Task
- [Requirements](https://github.com/syantovich/Clever-to-do-list)
- [App](https://ephemeral-axolotl-7542d8.netlify.app/)

### How to run the app
1. Clone the repository on your local machine  
 `git clone https://github.com/syantovich/Clever-to-do-list` 
2. Run `cd ./Clever-to-do-list` to move into the directory   
3. Run `npm install` to install all dependencies  
4. Run `npm start`. You'll see a new tab in the browser with the app running.


#### How to create git hooks
- Run `npm run prepare`
- Add a hook, e.g. `npx husky add .husky/pre-commit "npm lint"` (Will run `npm test` before making a commit)
- For more information, visit [husky npm page](https://www.npmjs.com/package/husky)

### Application stack
- React, React Router
- Redux-toolkit
- Firebase
- TypeScript
- MUI

### Database

- Event information is an object with keys
   - `name:string`;
   - `desc:string`;
   - `timeStart:string` format `hh:mm`
   - `timeEnd:string` format `hh:mm`
   - `date:string` format `yyyy-mm-dd`
   - `id:string`
   - `important` corresponds to one of `not_matter,very_important,important`
   - `isFinished:boolean`
  
- Database have 1 main collection `userinfo` 
- And a rest collection have names from the user's email

### Folder structure/Project information
- Project boilerplate was generated via `create-react-app --template typescript`
- You can find HTML and initial CRA setup in `public` folder
- React router pages can be found in `src/pages`
- Regular components which are not pages themselves can be found in `src/components`.
- Pictures can be found in `src/img`.
- In `src/services`, there are classes for creating db services and their instances that proxy interaction with DB.
- `src/store` contains reducers which created with redux/toolkit
- `src/regexp` contains RegExp for validation