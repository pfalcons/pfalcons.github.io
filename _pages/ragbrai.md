---
layout: page
title: Ragbrai
weight: 0
icon: fa-gear
permalink: /ragbrai/
---
<div class="ragbrai-cards">
	{% for ragbrai in site.ragbrai %}
	{% assign ragbrai_data = site.data.ragbrai[ragbrai.title] %}
		<div class="ragbrai-card">
			{% if ragbrai_data['logo'] %}<p><img class="img-thumbnail ragbrai-logo" src="/assets/images/ragbrai/{{ ragbrai_data['logo'] }}" alt="{{ ragbrai_data['name'] }}" /></p>{% endif %}
			<h2><a href="{{ ragbrai.url }}">{{ ragbrai.title }}</a> <span class="small">{{ ragbrai_data['name'] }}</span></h2>
		</div>
	{% endfor %}
</div>
