/*
 * Filter contents of PR news
 * AUTHOR: Roy Anonuevo
 */

(function ($) {

	var filterNews = (function() {

        // variables
        var $content,
            $el,
            $year,
            $month,
            $errorYear,
            $errorMonth,
            $articleList,
            $articleListArticle,
            $pagination,
            articles = [],
            filteredArticles = [],
            totalArticles = 0,
            minArticles = 10, // maximum number or article to dispaly
            totalPages = 0, // total number of page for pagination
            currentPage = 1, // current page selected
            pageNext = "&gt;",
            pagePrevious = "&lt;";

        return {
            init : init
        };

        function init() {

            $el = $('.filter-form'); // form element

            // let's check first if the element exist in the document
            // then lets add a listener,
            // else exit the module
            if (!$el || $el.length === 0) { return; }

            // cache dom elments
            $content = $('#content'); // content
            $year = $el.find("#filterYear");
            $month = $el.find("#filterMonth");
            $errorYear = $year.parent().find('.error');
            $errorMonth = $month.parent().find('.error');
            $articleList = $content.find('.article-list');
            $articleListArticle = $content.find('.article-list .article-preview');
            $pagination = $content.find('.article-pagination');

            // create an array of articles
            $articleListArticle.each(function(i) {
                $this = $(this);

                var date = $.trim($this.find('.date').html()), // get the date of each article and remove the whitespace from the beginning and end of a string
                    d = new Date(date),
                    year = d.getFullYear(),
                    month = d.getMonth() + 1;

                articles.push({"eq": i, "year": year, "month": month});

                $this.hide();

            });

            _populateYearOption();

            // let's add a listener
            _bindEvents();

            // display articles
            _showArticles();
		}

        function _populateYearOption() {
            var yearsArray = $('.article-list').find('.date').map(function() {
                var date = new Date($.trim(this.innerHTML));
                return date.getFullYear();
            });

            var yearOptions = []; // unique year

            for (var i = 0; i < yearsArray.length; i++) {
                if ($.inArray(yearsArray[i], yearOptions) === -1) {
                    yearOptions.push(yearsArray[i]);
                }
            }

            $.each(yearOptions, function(i, item) {
                $year.append($('<option>', {
                    value: item,
                    text: item
                }));
            });
        }

        function _bindEvents() {
            $el.on("submit", _processForm); // form

            $pagination.on("click", "a", _processPagination); // pagination anchor
        }

        function _processForm() {
            var year = $.trim($year.val()),
                month = $.trim($month.val());

            if(_validation(year, month)) { // validate the form
                _showArticles(year, month);
            }

            return false; // avoid reloading the page
        }

        function _validation(year, month) {
            $errorYear.hide();
            $errorMonth.hide();

            if(year =="" && month == "") {
                $errorYear.show();
                $errorMonth.show();
            }
            else if(month != "" && year == "") {
                $errorYear.show();
            }
            else {
                return true;
            }

            return false;
        }


        function _showArticles(year, month) {

            if(year && month) {
                // year and month supplied
                filteredArticles = $.grep(articles, function(value) {
                    return value.year == year && value.month == month;
                });
            } else if(year && !month) {
                // only year supplied
                filteredArticles = $.grep(articles, function(value) {
                    return value.year == year;
                });

            } else {
                // by default let's put all articles to filteredArticles
                filteredArticles = articles;
            }

            totalArticles = filteredArticles.length; // get the total articles in the dom
            totalPages =  Math.ceil(totalArticles / minArticles); // get the total pages for pagination
            currentPage = 1; // reset currentPage to 1

            $articleListArticle.hide(); // Let's assure that all articles is hide first

            if(totalArticles > 0) {

                $articleList.find('.no-result').hide();
                $pagination.show();

                // check if there's an article found
                var i = 1;
                $.each(filteredArticles, function(key, value) {
                    $articleList.find(".article-preview:eq("+value.eq+")").show();

                    if(i >= minArticles) {
                        return false; // break the loop if minimum of articles was show
                    }

                    i++;
                });

                // let's create pagination links
                _pagination();

            } else {
                // No articles on the dom, then lets prompt a message
                //Sorry, there is no result.
                $articleList.find('.no-result').show();
                $pagination.hide();
            }

        }

        function _pagination() {
            var pagination = "";

            $pagination.html(""); // remove pagination

            if(totalPages > 1) {
                // if pages is more than one then let's create a pagination links


                // prev page
                if(currentPage > 1) {
                    prevPage = currentPage - 1;
                    pagination += '<li><a href="javascript:void(0)" data-page="'+prevPage+'">'+pagePrevious+'</a></li>';
                }

                // current page
                pagination += '<li><a href="javascript:void(0)" data-page="'+currentPage+'">'+currentPage+'</a><span class="seperator">/</span></li>';

                // last page
                pagination += '<li><a href="javascript:void(0)" data-page="'+totalPages+'">'+totalPages+'</a></li>';


                // next page
                if(currentPage < totalPages) {
                    nextPage = currentPage + 1;
                    pagination += '<li><a href="javascript:void(0)" data-page="'+nextPage+'">'+pageNext+'</a></li>';
                }


                $pagination.html('<ul>'+pagination+'</ul>'); // display on dom
            }
        }


        function _processPagination() {
            currentPage = parseInt($(this).attr("data-page"));

            var start = (currentPage - 1) * minArticles,
                limit = start + minArticles;

            if(limit > totalArticles) {
                // check if limit is greater than to the total number of articles
                limit = totalArticles;
            }

            $articleListArticle.hide();

            for(var i = start; i < limit; i++) {
                var eq = filteredArticles[i].eq;
                $articleList.find(".article-preview:eq("+eq+")").show();
            }

            _pagination();
        }



    })();

    $(function() {
        filterNews.init();
    });

})(jQuery);