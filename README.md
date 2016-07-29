# get-shopify-images
Get the products images from your Shopify store

As I couldn't find a code to get that kind of "backup", I've made this code for a specific job, an than decided to share the whole script.

Look, there are probably better ways to make the loop, but this one has worked better for me. The only thing is that at some point I decided to work with local Json Files.

I hope this code helps anyone at all. 

If you know how to make it better! please **contribute** 
:)

__________

I made that using Node.js so be sure you got it on your machine.

So you can start cloning the repositpory, moving to the folder and than installing the dependencies

``` bash

  npm install

```

So now you just need to replace the config files on **index.js** with your settings

``` js
var key = '', //add your key
    secret = '', //add your secret
	store = '', //add your store slug on Shopify
	limit = 10, //define how many products the API will show for page 
	pathToSave = ''; //your local path like /Users/dev/my-store
```

Almost done, just run 

``` bash
  node run index.js
```

And whait the images download on **/products** folder.
