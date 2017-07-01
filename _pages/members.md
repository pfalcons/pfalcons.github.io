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
<div class="lead text-muted"><em>Owners</em></div>
{% for group in group_members %}
{% assign members = group.items | sort: 'weight' %}
{% for member in members %}
{% if member.co-owner %}
	{% include member-teaser.html %}
{% endif %}
{% endfor %}
{% endfor %}

{% comment %} Non-owner active members. {% endcomment %}
<div class="lead text-muted"><em>Active Team</em></div>
{% for group in group_members %}
{% assign members = group.items | sort: 'title' %}
{% for member in members %}
{% if member.co-owner != true and member.active %}
	{% include member-teaser.html %}
{% endif %}
{% endfor %}
{% endfor %}

{% comment %} Non-owner inactive members. {% endcomment %}
<div class="lead text-muted"><em>Past Members</em></div>
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
