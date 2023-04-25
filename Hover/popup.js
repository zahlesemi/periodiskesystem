function fetchWikipediaPreview(title, callback) {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        format: 'json',
        prop: 'extracts|pageimages',
        exchars: 200,
        exintro: 1,
        explaintext: 1,
        piprop: 'thumbnail',
        pithumbsize: 150,
        titles: title,
        origin: '*',
      },
      dataType: 'json',
      success: function(data) {
        callback(data);
      }
    });
  }

  $('.wikipedia-link').hover(function() {
    const title = $(this).text();
    const preview = $('#preview');

    fetchWikipediaPreview(title, function(data) {
      const page = data.query.pages[Object.keys(data.query.pages)[0]];
      const html = `
        <h3>${page.title}</h3>
        <img src="${page.thumbnail ? page.thumbnail.source : ''}" alt="${page.title}">
        <p>${page.extract}</p>
      `;

      preview.html(html);
      preview.show();
    });
  }, function() {
    $('#preview').hide();
  });

  $('body').on('mousemove', function(event) {
    $('#preview').css({
      left: event.pageX + 10,
      top: event.pageY + 10,
    });
  });