---
layout: default-full
title: Quotes
weight: 5
icon: fa-chat
permalink: /quotes/
---
<div class="container">
	<div class="quotes">
	{% assign group_quotes = site.data.quotes | group_by: 'ragbrai' | sort: 'name' %}
		<h1>{{ page.title }}</h1>
		<div class="row row-centered">
			<div class="col-md-6 col-md-centered">
				<small><p><a href="https://goo.gl/forms/WeYaOwYCSfM2qXsD2" target="_blank" class="btn btn-danger btn-block">Submit a quote</a></p></small>
			</div>
		</div>
		{% for group in group_quotes %}
		{% assign quotes = group.items | sort: 'year' %}
		<div class="row">
		{% for quote in quotes reversed %}
			<div class="col-md-4 quote">
				<blockquote>{{ quote.quote }}
				{% assign member = site.members | where:"short_name", quote.member | first %}
				{% if member or quote.year %}
				<div class="quote-details">
					{% if member %}
			    <a href="{{ member.url }}">
			      <div class="img-crop-circle"><img src="/assets/images/members/{{ member.image }}"></div>
						<div class="name">{{ member.title }}</div>
					</a>
					{% endif %}
			    {% if quote.year %}<span class="year small">{{ quote.year }}</span>{% endif %}
		    </div>
				{% endif %}
				</blockquote>
			</div>
		{% endfor %}
		</div>
	{% endfor %}
	<div class="row row-centered">
		<div class="col-md-6 col-md-centered">
			<small><p><a href="https://goo.gl/forms/WeYaOwYCSfM2qXsD2" target="_blank" class="btn btn-danger btn-block">Submit a quote</a></p></small>
		</div>
	</div>
	</div>
</div>
