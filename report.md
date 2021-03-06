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
Open source JavaScript runtime umhverfi fyrir bakenda og netsamskiptaforrit. Það er byggt á V8 Chrome JavaScript engine. Node notar event-driven uppbyggingu og hefur non-blocking inntak og úrtak, hvort tveggja auðveldar það að skala node kerfi upp.

###bower:
Package manager fyrir framenda sem hefur svipaða virkni og npm. Hefur þann stóra galla að hann tryggir ekki að pakkar séu óbreyttir, þ.e. sú útgáfa sem er tiltekin í verkefni.

###Deployment Path á degi 2:
Við erum búin að aðskilja þróun og prófanir í sitthvort Docker umhverfið sem keyra í centOs sýndarvél. Þar sem við notum Docker til að builda forritið þá erum við ekki lengur sek um það release antipattern að keyra source kóðann okkar beint áfram heldur erum við að deploya binaries. Við erum líka búin að taka fyrsta skrefið í áttina að því að gera ferlið sjálfvirkt með því að gera skriftu sem sækir nýjustu útgáfu af Dockerhub og keyrir á test umhverfinu, en erum þó enn að setja hana af stað í höndunum. Við erum því enn sem komið er með það release antipattern að deploya sjálf.

###Skil:
Ég kláraði liði 1-7 af verkefnalýsingunni og setti upp build pipeline í Jenkins en komst því miður ekki lengra.

Yeoman landing síðan er á http://192.168.33.15:9000/ og Jenkins er á http://192.168.33.15:8080/

Jenkins pípan samanstendur af 2 projectum sem eru tengd:

#####1) Commit stage

Build trigger er "Poll SCM", Schedule er H/2 * * * *

Build command er: export DISPLAY=:0 && export PATH="/usr/local/bin:$PATH" && bower install && npm install && ./dockerbuild.s

#####2) Acceptance

Build trigger er "Build after other projects are built", Projects to watch: Commit stage

Build command er: ./deploy_script.sh 192.168.33.15 && ./acceptance_script.sh 192.168.33.15 9000
