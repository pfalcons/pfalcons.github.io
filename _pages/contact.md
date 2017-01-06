---
layout: page
title: Contact
weight: 4
icon: fa-envelope
permalink: /contact/
---
<form action="https://formspree.io/contact@whitsitt.org"
      method="POST">
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" name="_replyto">
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" id="message" name="message" rows="3"></textarea>
    <input type="text" name="_gotcha" style="display:none" />
    <input type="hidden" name="_next" value="//pfalcons.github.io/contact" />
    </div>
  <button type="submit" class="btn btn-primary" value="Send">Submit</button>
</form>
