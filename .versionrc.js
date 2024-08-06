module.exports = {
  "types": [
    {"type": "chore", "section":"Others", "hidden": false},
    {"type": "revert", "section":"Reverts", "hidden": false},
    {"type": "feat", "section": "Features", "hidden": false},
    {"type": "fix", "section": "Bug Fixes", "hidden": false},
    {"type": "improvement", "section": "Feature Improvements", "hidden": false},
    {"type": "docs", "section":"Docs", "hidden": false},
    {"type": "style", "section":"Styling", "hidden": false},
    {"type": "refactor", "section":"Code Refactoring", "hidden": false},
    {"type": "perf", "section":"Performance Improvements", "hidden": false},
    {"type": "test", "section":"Tests", "hidden": false},
    {"type": "build", "section":"Build System", "hidden": false},
    {"type": "ci", "section":"CI", "hidden":false}
  ],
  "bumpFiles": [
    { "filename": "package.json", "type": "json" },
    { "filename": "vss-extension.json", "type": "json" },

    { "filename": "BuildTasks/Base64/v4/package.json", "type": "json" },
    { "filename": "BuildTasks/Base64/v4/task.json", "updater": "task-version.js" },

    { "filename": "BuildTasks/RegexReplace/v4/package.json", "type": "json" },
    { "filename": "BuildTasks/RegexReplace/v4/task.json", "updater": "task-version.js" },

    { "filename": "BuildTasks/NunjucksRender/v4/package.json", "type": "json" },
    { "filename": "BuildTasks/NunjucksRender/v4/task.json", "updater": "task-version.js" },

    { "filename": "BuildTasks/NunjucksInline/v4/package.json", "type": "json" },
    { "filename": "BuildTasks/NunjucksInline/v4/task.json", "updater": "task-version.js" },

    { "filename": "BuildTasks/UUID/v4/package.json", "type": "json" },
    { "filename": "BuildTasks/UUID/v4/task.json", "updater": "task-version.js" },

    { "filename": "BuildTasks/RegexMatch/v4/package.json", "type": "json" },
    { "filename": "BuildTasks/RegexMatch/v4/task.json", "updater": "task-version.js" },

  ]
}
