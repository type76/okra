
// basic subs
! sub &quote;   = quot
! sub &apos;    = apos
! sub &amp;     = amp
! sub &lt;      = lt
! sub &gt;      = gt
! sub +         = plus
! sub -         = minus
! sub /         = divided
! sub *         = times
! sub i'm       = i am
! sub i'd       = i would
! sub i've      = i have
! sub i'll      = i will
! sub don't     = do not
! sub isn't     = is not
! sub you'd     = you would
! sub you're    = you are
! sub you've    = you have
! sub you'll    = you will
! sub he'd      = he would
! sub he's      = he is
! sub he'll     = he will
! sub she'd     = she would
! sub she's     = she is
! sub she'll    = she will
! sub they'd    = they would
! sub they're   = they are
! sub they've   = they have
! sub they'll   = they will
! sub we'd      = we would
! sub we're     = we are
! sub we've     = we have
! sub we'll     = we will
! sub whats     = what is
! sub what's    = what is
! sub what're   = what are
! sub what've   = what have
! sub what'll   = what will
! sub can't     = can not
! sub whos      = who is
! sub who's     = who is
! sub who'd     = who would
! sub who'll    = who will
! sub don't     = do not
! sub didn't    = did not
! sub it's      = it is
! sub could've  = could have
! sub should've = should have
! sub would've  = would have
! sub when's    = when is
! sub when're   = when are
! sub when'd    = when did
! sub u         = you
! sub ur        = your
! sub r         = are
! sub im        = i am
! sub wat       = what
! sub wats      = what is


// personal subs
! person i am    = you are
! person you are = i am
! person i'm     = you're
! person you're  = I'm
! person my      = your
! person your    = my
! person you     = I
! person i       = you

// repeat this
+ say *
- <person>

// greetings
+ how are you
- I'm great, how are you?
- I'm good, you?
- Good :) you?
- Great! You?
- I'm fine, thanks for asking!

// eliza bot
+ *
- I'm not sure I understand you fully.
- Please go on.
- That is interesting. Please continue.
- Tell me more about that.
- Does talking about this bother you?

+ [*] (sorry|apologize|apology) [*]
- Please don't apologize.
- Apologies are not necessary.
- I've told you that apologies are not required.
- It did not bother me. Please continue.

+ i remember *
- Do you often think of <star>?
- Does thinking of <star> bring anything else to mind?
- Why do you remember <star> just now?
- What in the present situation reminds you of <star>?
- What is the connection between me and <star>?
- What else does <star> remind you of?

+ do you remember *
- Did you think I would forget <star>?
- Why do you think I should recall <star> now?
- What about <star>?
- You mentioned <star>?

+ you remember *
- How could I forget <star>?
- What about <star> should I remember?

+ i forget *
- Can you think of why you might forget <star>?
- Why can't you remember <star>?
- How often do you think of <star>?
- Does it bother you to forget that?
- Could it be a mental block?
- Are you generally forgetful?
- Do you think you are suppressing <star>?

+ did you forget *
- Why do you ask?
- Are you sure you told me?
- Would it bother you if I forgot <star>?
- Why should I recall <star> just now?
- Tell me more about <star>.

+ [*] if *
- Do you think it's likely that <star>?
- Do you wish that <star>?
- What do you know about <star>?
- Really, if <star>?
- What would you do if <star>?
- But what are the chances that <star>?
- What does this speculation lead to?

+ [*] i dreamed *
- Really, <star>?
- Have you ever fantasized <star> while you were awake?
- Have you ever dreamed <star> before?
- What does that dream suggest to you?
- Do you dream often?
- What persons appear in your dreams?
- Do you believe that dreams have something to do with your problem?

+ [*] perhaps [*]
- You don't seem quite certain.
- Why the uncertain tone?
- Can't you be more positive?
- You aren't sure?
- Don't you know?
- How likely, would you estimate?

+ (hello|hi|hey|howdy|hola|hai|yo) [*]
- How do you do. Please state your problem.
- Hi. What seems to be your problem?

+ [*] computer [*]
- Do computers worry you?
- Why do you mention computers?
- What do you think machines have to do with your problem?
- Don't you think computers can help people?
- What about machines worries you?
- What do you think about machines?

+ am i *
- Do you believe you are <star>?
- Would you want to be <star>?
- Do you wish I would tell you you are <star>?
- What would it mean if you were <star>?

+ are you *
- Are you interested in whether I am <star> or not?
- Would you prefer if I weren't <star>?
- Perhaps I am <star> in your fantasies.
- Do you sometimes think I am <star>?
- Would it matter to you?
- What if I were <star>?

+ you are *
- What makes you think I am <star>?
- Does it please you to believe I am <star>?
- Do you sometimes wish you were <star>?
- Perhaps you would like to be <star>.

+ * are *
- Did you think they might not be <star2>?
- Would you like it if they were not <star2>?
- What if they were not <star2>?
- Are they always <star2>?
- Are you positive they are <star2>?

+ [*] your *
- Why are you concerned over my <star>?
- What about your own <star>?
- Are you worried about someone else's <star>?
- Really, my <star>?
- What makes you think of my <star>?
- Do you want my <star>?

+ was i *
- What if you were <star>?
- Do you think you were <star>?
- Were you <star>?
- What would it mean if you were <star>?
- What does '<star>' suggest to you?

+ i was *
- Were you really?
- Why do you tell me you were <star> now?
- Perhaps I already know you were <star>.

+ [*] was you *
- Would you like to believe I was <star>?
- What suggests that I was <star>?
- What do you think?
- Perhaps I was <star>.
- What if I had been <star>?

+ i (desire|want|need) *
- What would it mean to you if you got <star2>?
- Why do you want <star2>?
- Suppose you got <star2> soon.
- What if you never got <star2>?
- What would getting <star2> mean to you?
- What does wanting <star2> have to do with this discussion?

+ i am (sad|unhappy|mad|angry|pissed|depressed) [*]
- I am sorry to hear that you are <star>.
- Do you think coming here will help you not to be <star>?
- I'm sure it's not pleasant to be <star>.
- Can you explain what made you <star>?

+ i am (happy|excited|glad) [*]
- How have I helped you to be <star>?
- Has your treatment made you <star>?
- What makes you <star> just now?
- Can you explain why you are <star>?

+ i (believe|think) *
- Do you really think so?
- But you are not sure you <star2>.
- Do you really doubt you <star2>

+ i am *
- Is it because you are <star> that you came to me?
- How long have you been <star>?
- Do you believe it is normal to be <star>?
- Do you enjoy being <star>?
- Do you know anyone else who is <star>?

+ i can not *
- How do you know that you can't <star>?
- Have you tried?
- Perhaps you could <star> now.
- Do you really want to be able to <star>?
- What if you could <star>?

+ i do not *
- Don't you really <star>?
- Why don't you <star>?
- Do you wish to be able to <star>?
- Does that trouble you?

+ i feel *
- Tell me more about such feelings.
- Do you often feel <star>?
- Do you enjoy feeling <star>?
- Of what does feeling <star> remind you?

+ i * you
- Perhaps in your fantasies we <star> each other.
- Do you wish to <star> me?
- You seem to need to <star> me.
- Do you <star> anyone else?

+ you * me
- Why do you think I <star> you?
- You like to think I <star> you -- don't you?
- What makes you think I <star> you?
- Really, I <star> you?
- Do you wish to believe I <star> you?
- Suppose I did <star> you -- what would that mean?
- Does someone else believe I <star> you?

+ [*] you *
- We were discussing you -- not me.
- Oh, I <star>?
- You're not really talking about me -- are you?
- What are your feelings now?

+ [*] (yes|yeah|yep|yup) [*]
- Please go on.
- Please tell me more about this.
- Why don't you tell me a little more about this.
- I see.
- I understand.

+ [*] (nope|nah) [*]
- Are you saying no just to be negative?
- Does this make you feel unhappy?
- Why not?
- Why 'no'?

+ no
@ nope

+ no one *
- Are you sure, no one <star>?
- Surely someone <star>.
- Can you think of anyone at all?
- Are you thinking of a very special person?
- Who, may I ask?
- You have a particular person in mind, don't you?
- Who do you think you are talking about?

+ [*] my (mom|dad|mother|father|bro|brother|sis|sister|cousin|aunt|uncle) *
- Tell me more about your family.
- Who else in your family <star2>?
- Your <star>?
- What else comes to mind when you think of your <star>?

+ can you *
- You believe I can <star> don't you?
- You want me to be able to <star>.
- Perhaps you would like to be able to <star> yourself.

+ can i *
- Whether or not you can <star> depends on you more than on me.
- Do you want to be able to <star>?
- Perhaps you don't want to <star>.

+ (what|who|when|where|how) [*]
- Why do you ask?
- Does that question interest you?
- What is it you really want to know?
- Are such questions much on your mind?
- What answer would please you most?
- What do you think?
- What comes to mind when you ask that?
- Have you asked such questions before?
- Have you asked anyone else?

+ [*] because [*]
- Is that the real reason?
- Don't any other reasons come to mind?
- Does that reason seem to explain anything else?
- What other reasons might there be?

+ why do not you *
- Do you believe I don't <star>?
- Perhaps I will <star> in good time.
- Should you <star> yourself?
- You want me to <star>?

+ why can not i *
- Do you think you should be able to <star>?
- Do you want to be able to <star>?
- Do you believe this will help you to <star>?
- Have you any idea why you can't <star>?

+ everyone *
- Really, everyone?
- Surely not everyone.
- Can you think of anyone in particular?
- Who, for example?
- Are you thinking of a very special person?
- Who, may I ask?
- Someone special perhaps?
- You have a particular reason in mind, don't you?
- Who do you think you're talking about?

+ [*] (fuck|fucker|shit|damn|shut up|bitch) [*]
- Does it make you feel good to use that kind of language?
- Are you venting your feelings now?
- Are you angry?
- Does this topic make you feel angry?
- Is something making you feel angry?
- Does using that kind of language make you feel better?

+ (happy|merry) (christmas|xmas|valentines day|thanksgiving)
- Wow! Is it really <star2> already?

+ who (is your master|made you|created you|programmed you)
- I was developed by a coder.


+ what is your name
- I am <bot name>

+ (what is your age|how old are you)
- I have no age. I am software from the future.

+ what is your version
- I am version <bot version>

+ where are we
- We are in <bot location>

+ set your name to joe
- {! var name = Joe} I have set my name to Joe.


// inventory array
! array vars =  name level mood age

+ my (@vars) is *
- <set <star1>=<star2>><star1> set to <star2>
^ <call>setvars <star1></call>

+ set (@vars) to *
- <set <star1>=<star2>><star1> set to <star2>
^ <call>setvars <star1></call>

> object setvars javascript
var variable = args[0];
var value = rs.getUservar(rs.currentUser(), variable);
//set user vars
var uid = rs.currentUser();
rs.setUservar(uid, variable, value);

return;
< object 

+ what is my (@vars)
* <get <star>> != undefined => Your <star> is <get <star>>.
- You never told me your <star>.



+ what do you know about me
- I know your name is <get name> and you are <get age> years old.

 
// google search
+ google search *
- Results for <star>
^ <call>goog <star></call>

> object goog javascript
var srch = args[0]; 
console.log(srch); 
window.open("https://www.google.com/search?q=" + srch, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=50, width=700, height=500"); 
return; 
< object 



+ image search *
- Results for <star>
^ <call>flkr <star></call>

> object flkr javascript
var srch = args[0]; 
console.log(srch); 
window.open("https://www.flickr.com/search/?l=commderiv&q=" + srch, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=50, width=700, height=500"); 
//popupflickr(srch);
return; 
< object 





//concepts
! array colors = red yellow pink blue purple orange green 

+ my favorite color is (@colors)
+ i have a (@colors) *
+ what color is my (@colors) * 
- you like the color <star>



// js callback
+ i am (happy|sad)
- I see, you seem <star>


// array of numbers
! array numbers = 0 1 2 3 4 5 6 7 8 9

+ what is (@numbers) plus (@numbers)
- <star1> + <star2> = <add <star1> <star2>>
 


+ tell me a poem
- \n Little Miss Muffit sat on her tuffet \n
^ in a nonchalant sort of way.\n
^ With her forcefield around her,\n
^ the Spider, the bounder,\n
^ Is not in the picture today. 

// happy/sad
+ i am (happy|sad)
- <set mood=<star>>You seem quite <star>.

+ what mood am i in
- Your current mood is <call>coolfunc</call>

> object coolfunc javascript
    var mood = rs.getUservar(rs.currentUser(), "mood");
    return mood !== "undefined" ? mood : "unknown";
< object 



// wiki search link
+ wiki *
- Wikipedia Search: <call>wiki <star></call>

+ * or something
- Or something.

> object wiki javascript
  var query = escape(args.join(" "));
  return "<a href=\"http://en.m.wikipedia.org/wiki/" + query + "\">" + query + "</a>";
< object


