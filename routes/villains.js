var express = require('express');
var router = express.Router();

/* All data comes from http://disney.wikia.com/ */
const villains = [
  {
    id:1,
    name:"Hades", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/2/27/Hades_Disney_transparent.png/revision/latest?cb=20130616161031",
    icon:"https://vignette.wikia.nocookie.net/disney/images/6/6a/Hercules-br-disneyscreencaps.com-635.jpg/revision/latest/scale-to-width-down/250?cb=20140909150025",
    movie:"Hercules", 
    bio:"He is the fast-talking god of the Underworld with a fiery temper and a vendetta against his eldest brother, Zeus. In secrecy, Hades hatches a scheme to take over Mount Olympus and the cosmos, but a prophecy by the Fates foretells that a hero will rise against him and end his reign."
  },
  {
    id:3,
    name:"Scar", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/c/c7/Scar.png/revision/latest?cb=20151005192537",
    icon:"https://vignette.wikia.nocookie.net/disney/images/9/9e/Mufasa-vs-Scar-the-lion-king-2801551-640-380.jpg/revision/latest/scale-to-width-down/250?cb=20140416162444",
    movie:"The Lion King", 
    bio:"The younger brother of Mufasa, he was next in line to rule the Pride Lands, only to lose his chance at the arrival of his nephew, Simba. This embittered Scar with jealously and a sense of entitlement, prompting him to form an alliance with a pack of hyena henchmen, and develop a regicidal plot to usurp the throne as king."
  },
  {
    id:4,
    name:"Urasula", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/c/c5/Ursula_transparent.png/revision/latest?cb=20170426170016",
    icon:"https://vignette.wikia.nocookie.net/disney/images/5/56/Tlmpe629.jpg/revision/latest/scale-to-width-down/250?cb=20121130074016",
    movie:"The Little Mermaid", 
    bio:"She is a villainous sea witch, who makes deals with unfortunate merfolk to achieve her own goals. With her sinister pet eels by her side, Ursula ultimately seeks to exact vengeance on her longstanding rival, King Triton, by overthrowing him and taking over the ocean, as queen."
  }, 
  {
    id:5,
    name:"Jafar", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/f/f9/Jafar_Aladdin.png/revision/latest?cb=20160511153548",
    icon:"https://vignette.wikia.nocookie.net/disney/images/e/e5/Aladdin-disneyscreencaps_com-1535.jpeg/revision/latest/scale-to-width-down/250?cb=20140415161234",
    movie:"Aladdin", 
    bio:"As Royal Vizier of Agrabah, he was presented as the Sultan's most trusted and loyal councilman. Imperious, Jafar held passionate disdain for the Sultan, and dedicated the latter half of his life to gaining ownership of a magic lamp containing an all-powerful genie—to that end, he would control cosmic power, to which he would use to overtake the kingdom and the world at large."
  },
  {
    id:6,
    name:"Maleficent", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/9/9e/Maleficent_01.png/revision/latest?cb=20151204153442",
    icon:"https://vignette.wikia.nocookie.net/disney/images/4/46/Maleficent_Kingdom_Keepers_Artwork.jpg/revision/latest/scale-to-width-down/250?cb=20150114182524",
    movie:"Sleeping Beauty", 
    bio:"Maleficent is an incarnation of pure evil, and responsible for all misfortune in King Stefan's kingdom. She takes offense at not being invited to the christening of Princess Aurora and attempts revenge on King Stefan and the Queen by cursing Aurora. She appears to be particularly disdainful of the three good fairies Flora, Fauna, and Merryweather, her polar opposites, who do all in their power to keep Maleficent's overwhelming evil magic at bay."
  },
  {
    id:7,
    name:"Evil Queen", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/d/d2/Queeen.png/revision/latest/scale-to-width-down/1031?cb=20120720005726",
    icon:"https://vignette.wikia.nocookie.net/disney/images/6/60/250px-Snowwhite-creencaps.com-8944.jpg/revision/latest?cb=20131118171233",
    movie:"Snow White and the Seven Dwarfs", 
    bio:"Determined to remain the fairest one of all, the Queen becomes insanely jealous of Snow White, the only one whose beauty surpasses her own. She eventually uses dark magic in the form of an aging potion to disguise herself into an old woman, in a final attempt to do away with her only, unknowing rival. Depicted in early designs as a fat character, her appearance eventually evolved into a much more sinister, stately beauty. She is generally one of Disney's most iconic and menacing first villains, once being voted the 10th greatest movie villain of all time by the American Film Institute. The Queen was animated by Art Babbitt and the Witch by Norman Ferguson."
  },
  {
    id:8,
    name:"Cruella De Vil", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/d/de/Cruella_De_Vil.png/revision/latest/scale-to-width-down/1032?cb=20170517173046",
    icon:"https://vignette.wikia.nocookie.net/disney/images/f/f7/Cruella_car.jpg/revision/latest/scale-to-width-down/250?cb=20131015001511",
    movie:"One Hundred and One Dalmatians", 
    bio:"She is a wealthy, fashion-obsessed heiress who wishes to use the skins of 99 Dalmatian puppies for a fur coat. She first appeared in the novel, The Hundred and One Dalmatians (1956) by Dodie Smith. Perhaps the most famous incarnation of the character was developed for Disney's 1961 animated adaptation, One Hundred and One Dalmatians by story man Bill Peet and animator Marc Davis. The Disney villainess proved successful and has led to appearances in other media and is a primary member of the Disney Villains franchise."
  },
  {
    id:9,
    name:"Captain Hook", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/c/ca/Captain_Hook_pose.jpg/revision/latest?cb=20170129064848",
    icon:"https://vignette.wikia.nocookie.net/disney/images/0/0b/Peterpan-disneyscreencaps-6985.jpg/revision/latest/scale-to-width-down/250?cb=20120130231528",
    movie:"Peter Pan", 
    bio:"Captain Hook has long since abandoned sailing the high seas in favor of having revenge on Peter Pan for cutting off his left hand and feeding it to Tick-Tock (considering it, by Mr. Smee, a 'childish prank'). While a worthy opponent for Peter Pan, Hook is destined to fail, sometimes because of Peter Pan's ability to fly, but more often through the bumbling actions of his first mate, Mr. Smee, who while unquestioningly faithful to the Captain, is incompetent and dim-witted. Hook ends up fleeing for his life from the Crocodile, of whom he is understandably terrified. Hook's frustrations are understandable; he lost a hand to his opponent, is constantly pursued by the crocodile and cannot fly.",
  },
  {
    id:10,
    name:"Queen Of Hearts", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/f/f5/OffWithHerHead-SW.png/revision/latest?cb=20160221131038",
    icon:"https://vignette.wikia.nocookie.net/disney/images/f/f0/Queen_trial.jpg/revision/latest/scale-to-width-down/250?cb=20141031042700",
    movie:"Alice in Wonderland", 
    bio:"She is the tyrannical and deranged ruler of Wonderland, and serves as one of the primary members of the Disney Villains franchise.",
  },
  {
    id:11,
    name:"Dr. Facilier", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/e/e5/Facilier_transparent.png/revision/latest?cb=20151205042012",
    icon:"https://vignette.wikia.nocookie.net/disney/images/6/65/Princess-and-the-frog-disneyscreencaps.com-2394.jpg/revision/latest/scale-to-width-down/250?cb=20140313212411",
    movie:"The Princess and the Frog", 
    bio:"Facilier's past is mostly unknown, though he mentions being a descendant of royalty through his mother (whose severed, shrunken head he keeps in his emporium). His motivations toward taking over New Orleans was briefly implied to be a result of a poor upbringing, where the wealthy either treated him with disrespect or ignored him altogether.",
  },
  {
    id:11,
    name:"Chernabog", 
    picture:"https://vignette.wikia.nocookie.net/disney/images/8/82/Cherna_bog_png.png/revision/latest?cb=20171130174817",
    icon:"https://vignette.wikia.nocookie.net/disney/images/2/2b/Chernabog-walt-disney-characters-19629069-1280-768.jpg/revision/latest/scale-to-width-down/250?cb=20150216032015",
    movie:"Fantasia", 
    bio:"He is based on the God of the Night in Slavic mythology. At Walpurgis Night (the Witches' Sabbath), he emerges from the peak of Bald Mountain (in reality Mount Triglav in Slovenia) to summon all of his minions, who dance furiously as he throws them into the mountain's fiery pit.",
  }
]

router.get('/villains', (req, res) => {
  res.json(villains)
})


router.get('/villains/:id', (req, res) => {
  res.json(villains.filter(v => v.id == req.params.id)[0])
})


module.exports = router;
