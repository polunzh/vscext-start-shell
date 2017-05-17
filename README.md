# start-git

A Visual Studio Code extension for opening git shell on windows.

## Configurations
``` json
{
    "startgit": {
        "shellPath": "path of git shell",
        "cwd": "git word directory"
    }
}
```

### startgit configurations
- shellPath *required*: It's the `git-bash.exe`(not `git-cmd.exe`) file in `git installation directory`
- cwd *option*: Default is current `vsc rootpath`

#### Default Key Binding
> `ctrl+alt+g`

### startshell

#### Configurations

``` json
"startshell": {
    "shells": [{
        "name": "{shell name}",
        "path": "{shell path}",
    }]
}
```

#### Usage
- `ctrl + shift + p` > input `start shell` > select your shell
- `ctrl + shift + s` > select your shell