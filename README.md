
# useBrazilApiCnpj

  

<p  align="center">

<img  width="60%"  height="60%"  src="https://raw.githubusercontent.com/FVitor7/use-brApiCnpj/main/images/logo.svg">

</p>
 

![use-viacep](https://badgen.net/bundlephobia/minzip/use-brapi-cnpj)

  

React hook to fetch Brazilian CNPJ's using [Brasil API]([https://brasilapi.com.br/](https://brasilapi.com.br//)).

  

## Install

  
##### NPM
```bash
npm i use-brapi-cnpj
```
##### YARN
```bash
yarn add use-brapi-cnpj
```

  

## Usage

  
```tsx

import React, { useState } from "react";
import useBrApiCnpj from "use-brapi-cnpj";

function App() {
  const [data, setData] = useState("");
  const { cnpj, loading, error } = useBrApiCnpj(data);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Aconteceu um erro ao tentar consultar este CNPJ!</p>;
  }

  return (
    <div>
      <div>
        <p>CNPJ: {cnpj && cnpj.cnpj}</p>
        <p>Razão Social: {cnpj && cnpj.razao_social}</p>
        <p>Nome Fantasia: {cnpj && cnpj.nome_fantasia}</p>
        <p>Número CNAE: {cnpj && cnpj.cnae_fiscal}</p>
        <p>Descrição CNAE: {cnpj && cnpj.cnae_fiscal_descricao}</p>
      </div>
      <input placeholder="Cnpj" onChange={(e) => setData(e.target.value)} />
    </div>
  );
}

export default App;

```

## Code Result

  <p  align="center">

<img  width="60%"  height="60%"  src="https://raw.githubusercontent.com/FVitor7/use-brApiCnpj/main/images/video.gif">

</p>

## Commands (for development only)

```bash
npm start # or yarn start
```
#### or
```bash
yarn start
```


This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

  

Then run the example inside another:

  

```bash

cd example

npm i # or yarn to install dependencies

npm start # or yarn start

```

  

To do a one-off build, use `npm run build` or `yarn build`.

  

To run tests, use `npm test` or `yarn test`.

  

## Using the Playground

  

```bash

cd example

npm i # or yarn to install dependencies

npm start # or yarn start

```

  

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**!

  

## License

  

MIT @Fábio Vitor