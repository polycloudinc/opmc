# OPMC CLI

CLI tool for working with the OPMC model (Org-Product-Module-Component).

## Setup

### Install

```
npm config set @aleisium:registry https://forgejo.aleisium.com/api/packages/aleisium/npm/
```

### Run

All commands use `npx @aleisium/opmc`. If you haven't configured the registry, append `--registry=https://forgejo.aleisium.com/api/packages/aleisium/npm/` to the npx command.

## Commands

### `org set`

Set or update the organization identity.

Create a new org:

```
npx @aleisium/opmc org set --symbol als --name Aleisium
```

Update an existing org (add or change the name):

```
npx @aleisium/opmc org set --name "Aleisium Pty Ltd"
```

### `product set`

Set or update the product identity.

Create a new product:

```
npx @aleisium/opmc product set --symbol opmc --name "OPMC Model"
```

Update an existing product:

```
npx @aleisium/opmc product set --symbol opmc --name "Updated OPMC Model"
```

### `module set`

Set or update the module identity.

```
npx @aleisium/opmc module set --symbol cli --name "CLI Module"
```

### `component set`

Set or update the component identity.

```
npx @aleisium/opmc component set --symbol main --name "Main Component"
```

### `component qname`

Emit the fully qualified component name.

Dashed style:

```
npx @aleisium/opmc component qname --style dashed
```

Dotted style:

```
npx @aleisium/opmc component qname --style dotted
```

### `module qname`

Emit the fully qualified module name.

Dashed style:

```
npx @aleisium/opmc module qname --style dashed
```

Dotted style:

```
npx @aleisium/opmc module qname --style dotted
```

### `product qname`

Emit the fully qualified product name.

Dashed style:

```
npx @aleisium/opmc product qname --style dashed
```

Dotted style:

```
npx @aleisium/opmc product qname --style dotted
```
