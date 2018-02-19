Portal Boilerplate
===

Esse repositório é um plugin desenvolvido com o Pentaho 8.0 que implementa uma aplicação AngularJS simples com menus que abrem Dashboards CTools dentro da interface.

Isso demonstra a capacidade de embutir Dashboards CDE/CDF dentro de uma aplicação Javascript utilizando RequireJS;

## Dependências

* NodeJS instalado - precisaremos apenas do `npm` para instalar dependêncicas javascript da aplicação.

## Instalação

* Cloneo repositório
```bash
cd <INSTALACAO>/pentaho-solutions/system
git clone https://github.com/oncase/portalboilerplate.git
```

* Instale as dependências javscript
```bash
cd portalboilerplate/app
npm install
```

* Reinicie o Pentaho

* Navegue até `http://localhost:8080/pentaho/content/portalboilerplate/app/index.html`