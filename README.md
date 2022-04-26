<img src="https://cheatcode-assets.s3.amazonaws.com/cheatcode-logo-sm.svg" alt="CheatCode">

## Next.js Boilerplate (Beta)

Front-end boilerplate for building web applications, based on [Next.js](https://nextjs.org).

[Join the Discord](https://discord.gg/UTy4Fpy)

---

### Table of Contents

0. [Who is This For?](#who-is-this-for)
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [File Structure](#file-structure)
4. [Pages & Components](#pages-components)
   - [Pages](#pages)
     - [Route Pages](#route-pages)
     - [Nested Pages](#nested-pages)
     - [Parameter Pages](#parameter-pages)
     - [Authenticated &amp; Public Pages](#authenticated--public-pages)
     - [Base Pages](#base-pages)
     - [Sitemap](#sitemap)
   - [Components](#components)
     - [Class-Based vs. Functional Components](#class-Based-vs-functional-components)
     - [Forms](#forms)
5. [Styles](#styles)
6. [GraphQL](#graphql)
7. [Accounts](#accounts)
8. [Settings](#settings)
9. [FAQ](#faq)
10. [Contributing](#contributing)
11. [License](#license)

### Who is This For?

This boilerplate was created first and foremost as a teaching aid, used in conjunction with tutorials and courses on [CheatCode](https://cheatcode.co)—a site decidated to teaching you how to build full-stack apps with JavaScript and Node.js.

Beyond this, it's also intended as a starting point for your product or service. It's a great fit for developers working on a new startup, or, an app for an existing business.

**It's important to note**: this boilerplate is _front-end only_. It was designed to work in conjunction with a separate back-end or API. We offer a [Node.js Boilerplate](https://github.com/cheatcode/nodejs-server-boilerplate) to fill this role for you, providing a working GraphQL server and accounts system that this Next.js boilerplate is already set up to use. Learn more about this decision [in the FAQ](#faq).

### Introduction

<blockquote>
<h4 style="margin:0 0 10px;">Back-End Agnostic</h4>
<p style="margin:0;">While you can use any back-end or API you wish with the boilerplate, by default, it's wired to work with the <a href="https://github.com/cheatcode/nodejs-server-boilerplate">CheatCode Node.js Boilerplate</a>.</p>
</blockquote>

This boilerplate was created to serve as a starting point for the front-end of a web application. It leverages Next.js to handle rendering components, routing, and bundling of application code.

On top of this, additional features are added to speed up your development process, including:

- Bootstrap v5 for CSS
- Styling via styled-components (w/ SSR support)
- A fully-wired accounts UI with signup, login, recover password, and reset password
- A fully-wired GraphQL client with pattern for managing mutations and queries on the client
- An example CRUD documents feature
- A global Redux store for storing app state
- An SEO component for offering Google-friendly, public-facing pages
- A pattern for managing and accessing environment-specific settings
- Easy form validation with helper component
- Alerts system for easy feedback and error reporting

### Getting Started

To get started, clone a copy of the boilerplate from Github:

```
git clone git@https://github.com/cheatcode/nextjs-boilerplate
```

Once the boilerplate is cloned, `cd` into its folder and run `npm install` to download all of the boilerplate's dependencies:

```
cd nextjs-boilerplate && npm install
```

**Note**: You can safely use [Yarn](https://yarnpkg.com/) for this step if you prefer.

#### Next Steps

Once you've cloned the boilerplate and installed all of its dependencies, the next step is to familiarize yourself with the file structure and how it differs slightly from a standard Next.js project.

### File Structure

While the boilerplate does primarily rely on the standard file structure of a Next.js project (anchored around the `/pages` directory), a few additions have been made. The following outlines the full structure of the boilerplate:

```
├── /components
│   ├── /AuthenticatedRoute
│   │   └── index.js
│   ├── /GraphQLError
│   │   ├── index.js
│   │   └── styles.js
│   ├── /Loading
│   │   ├── index.js
│   │   └── styles.js
│   ├── /Navigation
│   │   └── index.js
│   ├── /NavigationLink
│   │   └── index.js
│   ├── /PublicRoute
│   │   └── index.js
│   ├── /SEO
│   │   └── index.js
│   ├── /UserForm
│   │   ├── index.js
│   │   └── styles.js
│   └── /ValidatedForm
│       └── index.js
├── /graphql
│   ├── /mutations
│   │   ├── Documents.gql
│   │   └── Users.gql
│   ├── /queries
│   │   └── Documents.gql
│   └── client.js
├── /lib
│   ├── /users
│   │   ├── login.js
│   │   ├── loginWithToken.js
│   │   ├── logout.js
│   │   └── signup.js
│   ├── dates.js
│   ├── formatErrorString.js
│   ├── formatGraphqlError.js
│   ├── isClient.js
│   ├── pong.js
│   ├── store.js
│   ├── throttle.js
│   ├── validateForm.js
│   └── validators.js
├── /pages
│   ├── /documents
│   │   ├── [id]
│   │   │   ├── edit.js
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── create.js
│   │   ├── index.js
│   │   └── styles.js
│   ├── /login
│   │   ├── index.js
│   │   └── styles.js
│   ├── /recover-password
│   │   └── index.js
│   ├── /reset-password
│   │   └── [token].js
│   ├── /signup
│   │   └── index.js
│   ├── _app.js
│   ├── _document.js
│   ├── _error.js
│   ├── index.js
│   └── sitemap.xml.js
├── /public
├── /settings
│   ├── index.js
│   ├── settings-development.js
│   └── ** settings-production.js
├── /styles
│   ├── pong.css
│   └── styles.css
├── .gitignore
├── CREDITS.md
├── LICENSE.md
├── next.config.js
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

Files flagged with a `**` are not included by default but assumed to be added by you later (depending on need).

### Pages & Components

For components, there are two conventions in use: the standard `/pages` directory that Next.js uses for routing and rendering, and a boilerplate-custom directory `components` that contains a mix of React components used to build out the boilerplate's user interface.

#### Pages

There are two types of pages in the boilerplate: route pages and base pages. Route pages describe the page components contained in each of the folders inside the `/pages` directory.

##### Route Pages

Route pages is a generic term used to describe the pages rendered by Next.js, located in the folders within the `/pages` directory. These folders (and the files they contain) map to the current URL in the browser. Behind the scenes, Next.js automatically maps the browser's URL to the folder with the corresponding name for you.

For example, if we visit `http://localhost:5000/documents`, Next.js will attempt to render the component file located in the `/pages/documents` folder. To be clear, if we went to `http://localhost:5000/pizza`, Next.js would expect a folder located at `/pages/pizza` with an `index.js` file inside. The `index.js` part is assumed, so it's not necessary to include it in the URL (i.e., `https://localhost:5000/documents/index.js`).

###### Nested Pages

This introduces an important convention in Next.js, nested routes and parameters. If we look inside the `/documents` folder, we'll see the following files:

- `create.js`
- `index.js`
- `styles.js`

Here, like we saw above, the `index.js` file is accessed via the URL `http://localhost:5000/documents`. Conversely, the URL `http://localhost:5000/documents/create` maps to the `create.js` file.

While the `styles.js` file here does technically map to the URL `http://localhost:5000/documents/styles`, its intent is _not_ to be a rendered page, but instead to hold the [styled-components](https://styled-components.com/docs) CSS code for the pages in the `/pages/documents` folder. **This is a boilerplate-specific convention, not a Next.js convention**.

###### Parameter Pages

If we take a look inside of the `/pages/documents` folder again, we'll notice that there's a nested folder with a strange name `[id]`. Inside of the pages folder in Next.js, whenever we see a file _or_ folder name surrounded by brackets, that means that it's a _parameterized_ page.

For example, if we visit `http://localhost:5000/documents/123` or `http://localhost:5000/documents/456`, our goal is to render the same page _template_, but get different content.

Utilizing this bracketed-name convention in Next.js, we can specify when a URL has a dynamic section (in this case, the ID of the document, or, `123` or `456`). The purpose behind this is that, in some cases, we won't know the specific URL we're rendering, only the template that "type" of page requires.

If we look into the `/pages/documents/[id]` folder, we'll start to see a similar pattern emerge to what we saw earlier. Here, we have:

- `edit.js`
- `index.js`
- `styles.js`

Just like before, `edit` will correspond to the name of a route—as will `index.js`—and `styles.js` will contain styled-components CSS. The difference this time is that they're nested beneath a parameterized page, so, we can expect to get URLs like `http://localhost:5000/documents/123/edit`.

<blockquote>
<h4 style="margin:0 0 10px;">Works With Standalone Pages, Too</h4>
<p style="margin:0;">Though this example uses a parameterized folder, if you look at the <code>/pages/reset-password</code> page's folder, you'll find that individual pages can server as parameterized routes, too. This is helpful if you only have a single top-level (not nested) parameterized URL.</p>
</blockquote>

What's neat about parameterized pages is that you can place any word inbetween the brackets like `[pizza].js` or `[hotdog].js`. That name, then, will "capture" the dynamic part of the URL in that position and make it accessible inside of the component via the `router` object, returned either by Next.js's `useRouter()` hook, or, by importing the Next.js Router instance directly like:

```
import Router from 'next/router';

const nameOfPizza = Router.query.pizza;
```

Or, with hooks:

```
import { useRouter } from 'next/router';

const Pizza = () => {
  const router = useRouter();
  const nameOfPizza = router.query.pizza;
};
```

**Note:** the difference here is purly cosmetic and a matter of preference. Both methods return the same result.

##### Authenticated &amp; Public Pages

If you want to define routes and handle redirects based on a user's logged in or logged out status, you can use the `<AuthenticatedRoute />` or `<PublicRoute />` HOCs (higer-order components).

These components are nearly identical, with the sole difference being that `<AuthenticatedRoute />` ensures that a logged in user is _present_ before rendering the component passed to it. Conversely, the `<PublicRoute />` component ensures that a logged in user is _not_ present before rendering the component passed to it (useful for redirecting away from accounts-related pages like `/signup`).

Usage of these two components is handled by importing one of the components into an existing page component folder (e.g., in this boilerplate, `/pages/login/index.js`) and then "wrapping" it around the `export` of that component at the bottom of the file:

```javascript
import React from "react";
[...]
import authenticatedRoute from "../../components/AuthenticatedRoute";
[...]

const Documents = () => {
  [...]
};

Documents.propTypes = {};

export default authenticatedRoute(Documents);
```

Here, at the bottom, we export a call to `authenticatedRoute()` (the recommended way to case this is using camel-case), passing it our component, `Documents`. The `<PublicRoute />` HOC works in the exact same fashion:

```javascript
import React from "react";
[...]
import publicRoute from "../../components/PublicRoute";
[...]

const Login = () => {
  [...]
};

Login.propTypes = {};

export default publicRoute(Login);
```

For both the `publicRoute()` and `authenticatedRoute()` components, as a second argument (after the component), an options object can be passed. Currently, the `pathAfterFailure` option is the only option supported:

```javascript
import React from "react";
[...]
import publicRoute from "../../components/PublicRoute";
[...]

const Login = () => {
  [...]
};

Login.propTypes = {};

export default publicRoute(Login, { pathAfterFailure: '/some-authenticated-route' });
```

##### Base Pages

Base pages is a generic term used to describe the pages at the root of the `/pages` directory. This includes:

`_app.js`

A custom implementation of the `<App />` component in Next.js that includes a login handler for previously logged in users on mount and rendering of global provider components for Redux, Apollo, application navigation, and the currently rendered page (passed to `<App />` automatically by the Next.js router as `Component`). This page also includes the import for the boilerplates global styles, located in `/styles/styles.css`.

`_document.js`

A custom implementation of the `<Document />` component in Next.js that includes the base HTML template for the boilerplate. Also includes server-side rendering handlers for styled-components in the page's `getInitialProps` method and basic HTML metadata for SEO purposes.

> Hint: Check out the `<SEO />` component in the `/components` directory for a more detailed helper for rendering SEO metadata.

##### Sitemap

<blockquote>
  <p><strong>Note:</strong> Make sure to set the <code>meta.rootUrl</code> value in the settings file to the domain where your app is running. The sitemap depends on this value for generating the URLs it returns to crawlers. This is already configured in <code>/setttings/settings-development.js</code> but needs to be replicated for each environment you support (e.g., staging, production) if you want those environments crawlable.</p>
</blockquote>

To help with improving the SEO of your app, the boilerplate includes a `sitemap.xml.js` file at `/pages/sitemap.xml.js`. This file is _technically_ a page component, though, its component doesn't render anything. Instead, it piggybacks on the Next.js `getServerSideProps()` method and hijacks the inbound HTTP request, converting the response's `Content-Type` header to be `text/xml`.

Because Next.js creates routes based on file names in the `/pages` directory, by having `sitemap.xml.js` there, Next.js treats the `sitemap.xml` part as the route for that page (i.e., `http://localhost:5000/sitemap.xml`). The boilerplate utilizes this technique combined with setting the `Content-Type` header to "trick" browsers into thinking it's opening a `.xml` file on the server.

By default, the Sitemap only pulls the top-level pages in the boilerplate, not any of the dynamic data. This is intentional because the example Documents query in the boilerplate relies on a logged-in user.

If you'd like to see a good way to add dynamic data to the sitemap [read this tutorial on generating a dynamic sitemap](https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js#generating-dynamic-data-for-our-sitemap).

#### Components

Though technically speaking the pages in the boilerplate are React components, as their name implies, they're intended to be _pages_ rendered by the Next.js router, not standalone components.

To fill in this gap, the boilerplate adds a `/components` directory at the root of the project. This folder is designed to contain sub-folders, with each sub-folder representing one component in the app.

As a naming convention, **folder names are given the pascal-case name of the component**. This is done to make it easier to spot components in the folder as they're using the same as they do when in use in the application. For example, the component at `/components/Navigation` is rendered in the app as `<Navigation />` and the component at `/components/ValidatedForm` is rendered in the app as `<ValidatedForm />`.

##### Class-Based vs. Functional Components

Both class-based and functional components are in use in the boilerplate. This is intentional and an opinionated choice. The primary reason for this is tidiness and clarity. Functional components are great for smaller, simpler components that don't have a ton of functionality, while the separation provided by class methods is more friendly to large, complex components.

Which you choose is up to you. We recommend familiarizing yourself with both so you have more flexibility when building your app's front-end.

##### Forms

Generally speaking, one of the more tedious and common parts of any app are forms. In the boilerplate, forms are kept simple, using plain HTML (React/JSX-flavored, of course) inputs. The only "custom" forms-related feature in the app is the `<ValidatedForm />` component.

The `<ValidatedForm />` component in conjunction with the `/lib/validateForm.js` and `/lib/validators.js` files enables real-time form validation. The component is used as a convenience method for attaching the `validateForm.js` function to a form in a React component (`validateForm.js` is a custom, vanilla JavaScript library for running validation, written custom for the boilerplate).

The underlying library `validateForm.js` uses JavaScript DOM manipulation to render error messages and validate the form's inputs. Validations can be implemented as you wish, but a series of built-in validators are included in the `/lib/validators.js` file which relies on the `validator` NPM package.

###### <ValidateForm /> Usage

Usage of the `<ValidateForm />` component is straight-forward:

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
 	   emailAddress: '',
      password: ''
    };
  }

  handleSubmit = () => {
    // Submit logic goes here...
  };

  render() {
    const { emailAddress, password } = this.state;

    return (
      <ValidateForm
        rules={{
          emailAddress: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minLength: 8
          }
        }}
        messages={{
          emailAddress: {
            required: 'Email address is required.',
            email: 'Is this email valid?'
          },
          password: {
            required: 'Password is required.',
            minLength: 'Use at least 8 characters.'
          }
        }}
        onSubmit={() => {
          this.handleSubmit();
        }}
      >
        <form>
          <label>Email Address</label>
          <input
            type="email"
            name="emailAddress"
            value={emailAddress}
            onChange={(event) => this.setState({ emailAddress: event.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
        </form>
      </ValidateForm>
    );
  }
};
```

Here, the `<ValidateForm />` component takes three props:

- `rules` - Set to an object containing properties which describe the validation rules for the form. Each property represents a single field by its `name` attribute. Each property is assigned to an object containing the validation rules for the field.
- `messages` - Set to an object cotaning properties which descibre the validation rules for the form. Each property represents a single field by its `name` attribute. Each property is assigned to an object containing the validation rules for the field with its values set to error strings that should be displayed when a rule fails validation.
- `onSubmit` - Once validation is passed, the function to be called. This replaces the `onSubmit` attribute for the `<form></form>` tag.

As a user interacts with the form, the validation is run, displaying any errors beneath the input and highlighting the input with an `error` class.

### Styles

CSS styles are implemented in two ways in the boilerplate. Global styles (not page or component-specific styles) are implemented using Next.js' built-in CSS processing. These styles are located in the `/styles` directory at the root of the project. All of the files here are imported into the `/styles/styles.css` file and that file is imported in the `pages/_app.js` component.

At the page and component-level, CSS styles are implemented using [styled-components](https://styled-components.com).

### GraphQL

While the boilerplate is technically data-agnostic (it doesn't force you to use any specific means for retrieving or manipulating data in your app), it _does_ include wiring and examples for using GraphQL.

The boilerplate includes wiring for a GraphQL client using the Apollo GraphQL Client library, located at `/graphql/client.js`. Inside, a GraphQL client is established along with some default settings. The URL being connected to is set in the environment-specific settings file in the `/settings` folder (i.e., `settings/settings-development.js` contains your development settings, `settings/settings-production.js` contains your production settings).

From that file, the client is exported with the connection established. This can be imported directly into a component (or other file) for executing queries directly. If you wish to use the Apollo Client's `useQuery` or `useMutation` methods, as a convenience, the `<ApolloProvider />` has already been implemented in the `/pages/_app.js` component (this is required for `useQuery` and `useMutation` to work).

### Accounts

Though there is no account system immediately present in the boilerplate, it is wired to work with the complimentary [CheatCode Node.js Boilerplate](https://gituhb.com/cheatcode/nodejs-server-boilerplate) which _does_ include a full accounts implementation.

In the boilerplate, pages for each of the authentication stages (login, signup, recover password, and reset password) and calls to the Node.js Boilerplate's authentication setup (implemented as a series of GraphQL mutations, relying on JWT tokens stored as HTTP only, secure-only cookies in the browser) are fully-implemented for you.

While you're welcome to use whatever authentication system you'd like (e.g, Userbase, Auth0, etc.), this is an easy, free way to get user accounts set up while using all of CheatCode's tools.

### Settings

To assist in the management of client-side settings (things like API keys, configuration, etc.), a helper method and pattern are included in the boilerplate in the `/settings` directory of the project.

This directory contains three files:

- `index.js` - A loader file that selects the proper settings file based on the current value of `process.env.NODE_ENV`.
- `settings-development.js` - A file exporting an object, `settings` that contains the settings for your development environment.
- `settings-production.js` - An assumed file exporting an object, `settings`, that contains the settings for your production environment. This file is assumed because it is _not_ committed to your Git repository as a matter of security (you can change this in the `.gitignore` file at the root of the project).

If you want to use settings in your project, you can import the `index.js` file from your settings directory like this:

```
// Example: /graphql/client.js

import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import settings from "../settings";

const client = () =>
  new ApolloClient({
    credentials: "include",
    link: ApolloLink.from([
      new HttpLink({
        uri: settings.graphql.uri,
        credentials: "include",
      }),
    ]),
	[...]
  });

export default client();
```

You can customize your settings file however you'd like. If you change names or locations of settings, make sure to update the paths in your source code (e.g., in the GraphQL client example above, `settings.graphql.uri` must be defined in order for your client to work).

### FAQ

**Why is this front-end only instead of full-stack?**

This was a difficult choice. From experience, one of the more frustrating situations when you're working with a framework is vendor lock-in.

If/when the framework you rely on becomes obsolete (or financially or operationally unviable), solving this problem generally requires eating the cost of refactoring code.

To mitigate some of this cost, we chose to separate out the server-side portion of this boilerplate. This requires a little more effort in terms of managing multiple projects _today_, but also puts you in an advantageous situation later. If Next.js falls out of favor, at worst you just need to relocate some React components and JavaScript functions—not completely restructure your entire stack.

In addition to this, the decision to separate is also based on scalability and accessibility. Having both your client and server in one app is convenient for developers, but can introduce unnecessary strain on computing resources as your app grows. Not only that, but if you offer multiple front-ends (a web app, an iOS app, an Android app, etc), it means that you're burdening your web app front-end with requests from your other front-ends.

Finally, this choice was made in an effort to help the developers we teach. We want to encourage less dependence on specific stacks/frameworks and help developers to focus on their ability to adapt to _any_ JavaScript-based stack. Separating out the pieces invites just enough discomfort to help push our audience's skillset that much further.

### Contributing

<blockquote>
<h4 style="margin:0 0 10px;">Please Follow Instructions</h4>
<p style="margin:0;">If you don't follow these instructions, your proposal will be closed immediately.</p>
</blockquote>

The primary goal of this project is to server as a foundation for tutorials and courses offered on [CheatCode](https://cheatcode.co). In order to offer a relatively consistent API, changes are limited to bug fixes and feature additions. As a result **limited contributions are accepted to this boilerplate**.

While you're welcome to submit a pull request, likelihood of acceptance is limited. **If you have an idea for something you'd like to contribute, it's best to submit a Feature Request issue with a type of `proposal` in the issues tab of this repo**. There we can discuss the idea and any long-term considerations or changes before we greenlight the implementation.

### License

MIT

Copyright © 2021 CheatCode

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
