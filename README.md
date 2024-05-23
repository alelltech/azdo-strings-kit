# HTTP

This extension provides 1 task!

* `HttpAxiosRequest`

## Features

* Http Request with `Axios`.

## Basic queries syntax


## Usage sample

```yaml
- job:
  ...
  steps:
  - task: HttpAxiosRequest@4
    displayName: "Extract catalog-info.yaml info"
    inputs:
      url: https://
      sourceType: file
      queries: |
        # Extract results to variables
        var NAME = .metadata.name | downcase
        var KIND = .kind

        # Just print results
        echo .kind

        # Extract results to JSON file
        file ./foo/bar.json = .metadata.annotations


```

## Help us

See [CONTRIBUTING.md](https://github.com/alelltech/azdo-utils-kit/blob/main/CONTRIBUTING.md)

