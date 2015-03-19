{% extends "./layouts/main.swig" %}

{% block content %}
  <h2>Hello {{ name }}!</h2>

  {% include "./partials/message.swig" %}

  <div id="content" data-comments="{{ comments | json }}"></div>
{% endblock %}
