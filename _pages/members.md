---
layout: page
title: Members
weight: 2
icon: fa-group
permalink: /members/
---
<div>
{% assign group_members = site.members | group_by: 'ragbrai' | sort: 'name' %}

{% comment %} Owners {% endcomment %}
<h2>Owners</h2>
{% for group in group_members %}
{% assign members = group.items | sort: 'weight' %}
{% for member in members %}
{% if member.co-owner %}
	{% include member-teaser.html %}
{% endif %}
{% endfor %}
{% endfor %}

{% comment %} Non-owner active members. {% endcomment %}
<h2>Driver</h2>
{% for group in group_members %}
{% assign members = group.items | sort: 'title' %}
{% for member in members %}
{% if member.co-owner != true and member.active %}
{% if member.driver %}
	{% include member-teaser.html %}
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}

{% comment %} Non-owner active members. {% endcomment %}
<h2>Active Team</h2>
{% for group in group_members %}
{% assign members = group.items | sort: 'title' %}
{% for member in members %}
{% if member.co-owner != true and member.active %}
{% if member.driver != true %}
	{% include member-teaser.html %}
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}

{% comment %} Non-owner inactive members. {% endcomment %}
<h2>Past Members</h2>
{% for group in group_members %}
{% assign members = group.items | sort: 'title' %}
{% for member in members %}
{% if member.co-owner != true and member.active != true %}
	{% include member-teaser.html %}
{% endif %}
{% endfor %}
{% endfor %}

</div>
<script type="text/javascript">
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
</script>
