# Project 6 Nano Degree Front End Developer
## Testing Javascript Testing

How to run this project:

You have to have git installed if you want to run the
project on a local computer. Get the project with:

*git clone https://github.com/jmfrank63/frontend-nanodegree-feedreader.git*

Run it by opening index.html in your favourite browser.

To see the project running navigate to:

*https://frontend-nanodegree-feedreader-jmfrank63.c9.io/index.html*

----------------------------------------------------------------

##Notes to the instructors:

Compared to project 5 this project is rather small. The lesson
is quick and most of the tests are quite straight forward.

The project makes use of *https://github.com/velesin/jasmine-jquery*
an external library. It is allready downloaded and can be found 
under the *jasmine/lib/thirdparty* directory.

The only thing that was quite tricky is asynchrounous testing.
I had my troubles getting this suite to test correctly.
I am not sure if the behavior is a bug or a feature.
But I seemed done() is only acknowledged correctly after the
outer function terminates.
This means that you cannot call async functions in "it".
Well of course you can, but their results are ignored :-)

I didn't do intense testing if this behavior is just
with loadFeed and has to do with some sort of caching
or if it is burried in jasmine itself.

Looking at the forum I found other students had a similar
problem.

Nevertheless this project is very valuable for ... project 5.
I will do project 5 after project 6. I hope switching the two
will pay out.