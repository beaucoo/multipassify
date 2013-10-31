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

To use Multipass an Enterprise / Plus plan is required. The Multipass secret can be found in your shop Admin (Settings > Checkout > Customer Accounts).
Make sure "Accounts are required" or "Accounts are optional" is selected and Multipass is enabled.

``` js
  var Multipassify = require('multipassify');

  // Construct the Multipassify encoder
  var multipassify = new Multipassify("SHOPIFY MULTIPASS SECRET");

  // Create your customer data hash
  var customerData = { email: 'test@example.com', remote_ip:'USERS IP ADDRESS', return_to:"http://some.url"};

  // Encode a Multipass token
  var token = multipassify.encode(customerData);

  // Generate a Shopify multipass URL to your shop
  var url = multipassify.generateUrl(customerData, "yourstorename.myshopify.com");

  // Generates a URL like:  https://yourstorename.myshopify.com/account/login/multipass/<MULTIPASS-TOKEN>
```