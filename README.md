PartialJS
=========

Javascript plugin to process partial content

How to use
==========

* Partialjs depends on jquery for loading files, you need to add jquery to your project.

Single partial
--------------

Partialjs can process a content from a file or data, you just need to choose what type of data you'll use. You can create variables in your partial and set their values when you call partialjs.

**Using variables**

**myContent.html**
```html
  <div>
    My partial content.
    <p>{{name}}</p>
    <p>{{age}}</p>
  </div>
```


```javascript
  var partial = new Partial({
    file: "/partials/myContent.html",
    values: {
      name: "John",
      age: "18"
    }
  }).load(function(data){
    //data is your content processed
    $("#myContent").append(data);
  });
```

PartialJS will return your content processed with variables values. In the example above data processed will be:

```html
  <div>
    My partial content.
    <p>John</p>
    <p>18</p>
  </div>
```

Nested partials
-----------------

Nested partials can be processed with PartialJS, see the example below:

**customers.html**

```html
  <div>
    My partial content.
    <p>{{title}}</p>
    <table>
      <tr>name</tr>
      <tr>age</tr>
      <tbody>
        {{customers}}
      </tbody>
    </table>
  </div>
```

**partial_table.html**

```html
  <tr>
    <td>{{name}}</td>
    <td>{{age}}</td>
  </tr>
```

```javascript
  var partial = new Partial({
    file: "/partials/customers.html",
    values: {
      title: "Title first project"
    },
    partials: [
      {
        name: "customers", //name is the name of your variable in your main partial
        file: "partials/partial_table.html",
        values: [ //values is an array, so you can have multiple values
          {
            name: "John",
            age: 18
          },
          {
            name: "Alex",
            age: 29
          }
        ]
      }
    ]
  }).load(function(data){
    //data is your content processed
    $("#myContent").append(data);
  });
```

In this example PartialJS will return:

```html
  <div>
    My partial content.
    <p>Title first project</p>
    <table>
      <tr>name</tr>
      <tr>age</tr>
      <tbody>
        <tr>
          <td>John</td>
          <td>18</td>
        </tr>
        <tr>
          <td>Alex</td>
          <td>29</td>
        </tr>
      </tbody>
    </table>
  </div>
```

Contribute
==========

If you experience some error you can create an issue.

Please, feel free to fork and make a pull request at anytime.
