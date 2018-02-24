jQuery "back to top" plugin
============================

Usage
-----

Load the script:

```html
<script src="jquery.js"></script>
<script src="jquery.backtotop.js"></script>
```

Put a button:

```html
<button id="btn-back-to-top">Back to top</button>
```

Position it:

```css
#btn-back-to-top {
    position: fixed;
    bottom: 15px;
    right: 15px;
    display: none;
}
```

Run the script:

```javascript
(function($) {
    $('#btn-back-to-top').backtotop();
})(jQuery);
```

With options:

```javascript
(function($) {
    $('#btn-back-to-top').backtotop({
        showAt: 200,
        fadeInDelay: 400,
        fadeOutDelay: 400,
        scrollTopDelay: 600
    });
})(jQuery);
```
