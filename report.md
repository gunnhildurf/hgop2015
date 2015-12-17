#Report

###Vagrant:
Vagrant er tól til að búa til sýndarþróunarumhverfi. Hægt að nota til þess að aðskilja t.d. þróun og prófanir frá upphafi án þess að þurfa heilmikinn vélbúnað. Stillingar eru gerðar í Vagrantfile og umhverfinu er komið af stað og stjórnað með command line skipunum.

###VirtualBox:
Verkfæri til að búa til sýndarvélar. Með því er hægt að stúka af hluta af vinnsluminni vélar og nota það t.d. til þess að keyra annað stýrikerfi en vélin sjálf notar.

###Grunt:
JavaScript task runner sem gerir endurtekningasöm verk eins og einingapróf sjálfkrafa. Verkefnin eru skilgreind í Gruntfile og fara ýmist sjálfkrafa í gang þegar project er buildað, eða eru sett af stað með command line skipunum.

###npm:
Package manager fyrir Node. Hjartað í honum er package.json þar sem öll dependency fyrir hugbúnað eru skilgreind, bæði þau sem þarf til að keyra hugbúnaðinn og þau sem þarf við þróun. Þegar package.json er til staðar er hægt að gera npm install og þá sækir npm allt sem til þarf.

###nodejs:
JavaScript umhverfi fyrir bakenda og netsamskiptaforrit.

###bower:
Package manager fyrir framenda sem hefur svipaða virkni og npm. Hefur þann stóra galla að hann tryggir ekki að pakkar séu óbreyttir, þ.e. sú útgáfa sem er tiltekin í verkefni.

###Deployment Path á degi 2:
Við erum búin að aðskilja þróun og prófanir í sitthvort Docker umhverfið sem keyra í centOs sýndarvél. Þar sem við notum Docker til að builda forritið þá erum við ekki lengur sek um það release antipattern að keyra source kóðann okkar beint áfram heldur erum við að deploya binaries. Við erum líka búin að taka fyrsta skrefið í áttina að því að gera ferlið sjálfvirkt með því að gera skriftu sem sækir nýjustu útgáfu af Dockerhub og keyrir á test umhverfinu, en erum þó enn að setja hana af stað í höndunum. Við erum því enn sem komið er með það release antipattern að deploya sjálf.
