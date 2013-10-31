multipassify
============

Shopify Multipass module for Node.js



[Shopify](http://shopify.com) provides a mechanism for single sign-on known as Multipass.  Multipass uses an AES encrypted JSON hash and multipassify provides functions for generating tokens

More details on Multipass with Shopify can be found [here](http://docs.shopify.com/api/tutorials/multipass-login).

## Installation
<pre>
    npm install multipassify
</pre>

## Usage

Multipass is constructed with two arguments: an API key and a site key.  These keys can be found within the Tender admin (Accounts & Settings > Extras > Single Sign-On).

``` js
  var Multipassify = require('multipassify');

  // Construct the Multipassify encoder
  var multipassify = new Multipassify(config.shopifyMultipassSecret);

  // Encode a Multipass token
  var token = multipassify.encode({ email: 'test@example.com', remote_ip:'some ip address', return_to:"http://some.url"});

  // Decode a Multipass token
  var obj = multipass.decode(token);
```