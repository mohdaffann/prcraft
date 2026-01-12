<div align = "center">
    <img src = "https://res.cloudinary.com/dfmtemqoz/image/upload/New_Project_gtdfqp.png" width="2500" height="1360" alt="prg" />

 <div>
    <p>Bored of writing manual PRs ? Just prcraft it</p>
 </div>
 <div>
   <a href="https://www.npmjs.com/package/prcraft" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/v/prcraft" alt="npm version">
  </a>

  <a href="https://www.npmjs.com/package/prcraft" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/dt/prcraft" alt="npm downloads">
  </a>

  <a href="https://github.com/mohdaffann/prcraft/stargazers" target="_blank" rel="noopener">
    <img src="https://img.shields.io/github/stars/mohdaffann/prcraft" alt="GitHub stars">
  </a>

  <a href="LICENSE" target="_blank" rel="noopener">
    <img src="https://img.shields.io/npm/l/prcraft" alt="License">
  </a>
 </div>

</div>



## Features
- Automatic PR content generation from git diffs
- Multipled styled templates : brief , technical or detailed
- Works on any git repo irrespective of the naming of branch
- Powered by Groq's fast LLM API
## Installation

```
npm i -g prcraft
```
Note : The Node version shall be >=18
## Setup

First , get your Groq API key from their platform .

Set the environment variable :

**Windows (Powershell) :**
```
setx GROQ_API_KEY "your-key-here"
```

**Windows (cmd) :** same as powerchell command
```
setx GROQ_API_KEY "your-key-here"
```

**macOS / Linux :**
```
echo 'export GROQ_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```
## Usage
```
# create a branch and make new changes
git checkout -b feature-branch/new-feature
#...new changes...
git add .
git commit -m "Add new feature"

# Generate PR content
prgen

# Or use different styles
prgen-b  # Brief description
prgen-d  # Detailed description
prgen -t # Technical description (Default)
```

### Style Flags - When to use What?

#### Brief ('-b') - Quick and concise
**Use when:**
- Fixing typos or formatting
- Updating dependencies
- Small and minimalist changes

#### Technical ('-t' or default) - Implementation focused
**Use when:**
- Adding new features
- Refactoring code
- Performance optimizations
- Huge or impactful changes

#### Detailed ('-d') - Comprehensive explaination
**Use when:**
- Architectural changes
- Breaking changes 
- Large code additioon
- New framework or tech addition


## How it Works
1. Detects your base branch (upstream/main , origin/main or main)
2. Generates git diff between base and current branch
3. Sends the diff to Groq's LLM API with selected template
4. Returns formatted PR title and description
## Requirements
- Nodejs >= 18
- Groq API key
- Git repo
## License
MIT

## Contributing
Issues and PRs are Welcome! (might as well use prcraft for this 😁)

## Author
Mohammed Affan
