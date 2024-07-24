# HTTP

This extension provides 1 task!

* `Base64`
* `RegexReplace`
* `Nunjucks`

## Features

* Encode/Decode Base64 contents from/to **File**, **Variable** or **Raw Text expression**.
* Replace contents using ECMAScript `Regex` expressions from/to **File**, **Variable** or **Raw Text expression**.
* Proccess [`Nunjucks`](https://mozilla.github.io/nunjucks/templating.html) templates from/to **File**, **Variable** or **Raw Text expression** with [`underscore.string`](https://www.npmjs.com/package/underscore.string) filters **esteroids**.
* Proccess `Nunjucks` on `inline` operations with [`underscore.string`](https://www.npmjs.com/package/underscore.string) filters **esteroids**.
* Generate multiple `UUID's` **v4**.


### Nunjunks Plus embeded filters
* pascalCase
* base64
* encode64
* decode64
* encodeHex
* decodeHex

## Usage sample

```yaml
- job:
  ...
  steps:
  - task: Base64@4
    displayName: "Encode"
    inputs:
      source: mycontent
      dest: MY_ENCODED_64_VAR

  - task: Base64@4
    displayName: "Encode"
    inputs:
      sourceType: file
      source: ./my-file.txt
      destType: var
      dest: MY_ENCODED_64_VAR

- task: RegexReplace@4
  inputs:
    sourceType: 'text'
    source: 'hello world'
    destType: 'text'
    regex: '/(hello )(world)/ig'
    substitution: '$1 frank $2'

- task: NunjucksRender@4
  inputs:
    sourceType: 'text'
    source: |-
      my static content prefix
      {{ MY_ENV | _classify }}
      my static content sufix
    destType: 'text'
  env:
    MY_ENV: my new text

- task: NunjucksInline@4
  inputs:
    sourceType: 'text'
    source: |
      var pascal_name = BUILD_REPOSITORY_NAME | pascalCase
      var base64 = BUILD_REPOSITORY_NAME | encode64
      echo {{ BUILD_REPOSITORY_NAME | pascalCase }} -- {{ BUILD_REPOSITORY_NAME | encode64 }}

- task: UUID@4
  inputs:
    amount: '3'
    variablePrefix: MY_UUID_VAR_

```

## Help us

See [CONTRIBUTING.md](https://github.com/alelltech/azdo-string-kit/blob/main/CONTRIBUTING.md)

*If you like our project help us to make more best solutions.*

> `Bitcoin` / network `BTC`:
>
> `1NvnQAp2e46Fqv4YaoYTioypJZdq4Kc3Az`

> `Etherium` / network `Etherium`:
>
> `0x38a2113604fb3d642bbd009301e94848a499cea4`

> `BitTorrent` / network `Tron`:
>
> `TD9LHa5BjWQpf4oP3uYWP8ghnojJWJy53C`
