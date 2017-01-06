---
layout: page
title: Members
weight: 2
icon: fa-group
permalink: /members/
---
<div>
{% assign group_members = site.members | group_by: 'first_ragbrai' | sort: 'name' %}

{% comment %} Owners {% endcomment %}
<div class="lead text-muted"><em>Owners</em></div>
{% for group in group_members %}
{% assign members = group.items | sort: 'weight' %}
{% for member in members %}
{% if member.co-owner %}
<div class="member clearfix">
	<div class="row">
		<div class="col-md-5">
		{% if member.image %}<p><img class="img-thumbnail member-image" src="/assets/images/members/{{ member.image }}" alt="{{ member.title }}" /></p>{% endif %}
		</div>
		<div class="col-md-7">
			<h2><a href="{{ member.url }}">{{ member.title }}</a>{% if member.nickname %}&nbsp;<small><em>{{ member.nickname }}</em></small>{% endif %}{% if member.active %}&nbsp;<i class="fa fa-check-circle text-success" title="active member" data-toggle="tooltip" data-placement="right"></i>{% else %}&nbsp;<i class="fa fa-minus-circle text-danger" title="inactive member" data-toggle="tooltip" data-placement="right"></i>{% endif %}</h2>
			{% if member.co-owner %}<p class="label label-success">Co-Owner</p>{% endif %}
			{% if member.role %}<p class="lead member-role"><strong>{{ member.role }}</strong></p>{% endif %}
			{% if member.first_ragbrai %}<p class="first-ragbrai text-muted small"><em>Member since {{ member.first_ragbrai }}</em></p>{% endif %}
		</div>
	</div>
</div>
<hr />
{% endif %}
{% endfor %}
{% endfor %}

{% comment %} Non-owner members. {% endcomment %}
<div class="lead text-muted"><em>Team</em></div>
{% for group in group_members %}
{% assign members = group.items | sort: 'title' %}
{% for member in members %}
{% if member.co-owner != true %}
	<div class="member clearfix">
		<div class="row">
			<div class="col-md-5">
			{% if member.image %}<p><img class="img-thumbnail member-image" src="/assets/images/members/{{ member.image }}" alt="{{ member.title }}" /></p>{% endif %}
			</div>
			<div class="col-md-7">
				<h2><a href="{{ member.url }}">{{ member.title }}</a>{% if member.nickname %}&nbsp;<small><em>{{ member.nickname }}</em></small>{% endif %}{% if member.active %}&nbsp;<i class="fa fa-check-circle text-success" title="active member" data-toggle="tooltip" data-placement="right"></i>{% else %}&nbsp;<i class="fa fa-minus-circle text-danger" title="inactive member" data-toggle="tooltip" data-placement="right"></i>{% endif %}</h2>
				{% if member.co-owner %}<p class="label label-success">Co-Owner</p>{% endif %}
				{% if member.role %}<p class="lead member-role"><strong>{{ member.role }}</strong></p>{% endif %}
				{% if member.first_ragbrai %}<p class="first-ragbrai text-muted small"><em>Member since {{ member.first_ragbrai }}</em></p>{% endif %}
			</div>
		</div>
	</div>
	<hr />
{% endif %}
{% endfor %}
{% endfor %}

</div>
<script type="text/javascript">
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});
</script>
