# Density Functional Theory

What's The Point of Density Functional Theory? In previous lessons,
we've covered the fundamental limitations of Hartree-Fock theory, as
well as some of the ways that various post-HF theories systematically
improve upon it. As we've seen, post-HF theories tend to be extremely
computationally demanding, and it takes serious effort to apply them to
systems with more than a few dozen atoms. Density Functional Theory
(DFT) takes a very different approach to the simulation of quantum
properties, with its own set of advantages and disadvantages. We'll talk
more about the theory later, but the basic concept is this: instead of
trying to systematically improve on mean-field HF theory by calculating
specific components of the electron correlation, DFT attempts to
approximate the electron correlation with so-called "density
functionals". These are relatively simple mathematical expressions that
are relatively easy to evaluate on a computer. In most cases, density
functionals aren't derived directly from approximations to the laws of
quantum mechanics - unlike post-HF methods, they are not generally ab
initio. In simplified terms, you can think of "density functionals" as
being mathematical equations that perform highly sophisticated
guesstimations at a low computational cost. Density functionals often
include parameters that are fitted to experimental or post-HF results,
in a somewhat similar manner to the way that parameters in empirical
molecular mechanics force fields are fitted. For this reason, it's not
possible to say that one DFT functional is strictly "better" than
another. In the case of post-HF theories, it is a simple matter to
construct a hierarchy of methods: for example, full CI is better than
CCSD(T), which is better than CCSD, which is better than HF. With DFT,
the situation is blurrier: functionals that perform fantastically for
certain types of chemical systems might do very poorly for others. By
the end of this lesson, you'll learn more about the theory behind DFT,
the advantages and disadvantages it offers, and the types of functionals
that are likely to be suitable for different types of simulations.

*****

**Example 1**: DFT for Diatomics Before we think more deeply about the
theory of DFT, let's play around with some simple DFT calculations. When
running DFT calculations, one of the first things you'll need to realize
is that there is a vast number of different density functionals, with
helpful and intuitive names like PBE, PBE0, mPW1K, B3LYP, M06, M06-D3,
⍵B97X-D, B2GPPLYP, and many more. This eclectic collection has been
described as an "alphabet soup" by more than one researcher, and it's
one of the most intimidating points of confusion for people who want to
use DFT for the purpose of simulating chemical systems. Is there any
consistent pattern to the seemingly random groupings of letters and
numbers? The answer is a definite no. Sometimes a letter stands for one
of the people who created the functional. Other times it stands for the
location where the functional was developed. A third case is when it
means something about the actual mathematical form of the functional.
The numbers also don't have a single origin.: Sometimes the numbers
express something about the mathematical form of the functional, and
other times they simply represent the year the functional was developed.
It's easy to be overwhelmed by the challenge of selecting a functional
to use. Fortunately, density functionals tend to fall into one of
several broad categories, and you can usually use these categories as a
rough starting point. We'll talk more about these categories later, but
for this example, we'll run some tests using three popular functionals:
PBE, B3LYP, and M06. We'll run the tests on a familiar set of diatomic
molecules: H2, HF, and HCl. You've previously computed the bond energies
and bond lengths for these molecules using the HF and CCSD(T) methods,
and these values are reproduced in the table below. Now, compute the
bond energies and bond lengths using the PBE, B3LYP, and M06
functionals. Running a DFT calculation works almost exactly like running
a HF calculation, except that the "Method" you select should be the DFT
functional you want to use (i.e., PBE, B3LYP, or M06). Add the results
to the table.

<!-- quiz -->
## Question 1
What is DFT?
- ( ) 3
- (x) 4
- ( ) 5
- ( ) 6

## Question 2
What is the capital of France?
- ( ) Berlin
- (x) Paris
- ( ) London
<!-- endquiz -->

*****

Example Input File #1: M06 for HCl

molecule { 0 1 H 0.0 0.0 0.0 Cl 1.0 0.0 0.0 }

set basis aug-cc-pVDZ

set reference rks set freeze_core True

optimize(\'M06\')

Example Input File #2: MP2 for HCl

molecule { 0 1 H 0.0 0.0 0.0 Cl 1.0 0.0 0.0 }

set basis aug-cc-pVDZ

set reference rhf set freeze_core True

optimize(\'MP2\')

Example Input File #3: HF for H molecule { 0 2 H 0.0 0.0 0.0 }

set basis aug-cc-pVDZ

set reference uhf set freeze_core True

energy(\'HF\')

*****

Results

CCSD(T) HF MP2 PBE B3LYP M06 H -0.499334315439586 -0.499334315439586
-0.499334315439586 -0.499225147772742 -0.501657882045278
-0.498143849685059 H -0.499334315439586 -0.499334315439586
-0.499334315439586 -0.499225147772742 -0.501657882045278
-0.498143849685059 H2 -1.16489937 -1.12882654 -1.1562091 -1.16092253
-1.17402629 -1.16695415

au -0.166230739120828 -0.130157909120828 -0.157540469120828
-0.162472234454516 -0.170710525909444 -0.170666450629882 kcal/mol
-104.311385948347 -81.6753385344922 -98.8581580269664 -101.952888158408
-107.122495200132 -107.09483753873 kj/mol -436.730702065765
-341.958144025535 -413.899138310987 -426.856148235846 -448.50024865892
-448.384451617479

94.7725580402305 22.8315637547786 9.87455382991919 -11.769546593155
-11.6537495517135

Bond Length 0.76211425648 0.748276562892 0.755128598038 0.768178602072
0.761064988462 0.757692083292 Length Error

-0.013837693588 -0.006985658442 0.006064345592 -0.001049268018
-0.004422173188

CCSD(T) HF MP2 PBE B3LYP M06 H -0.499334315439586 -0.499334315439586
-0.499334315439586 -0.499225147772742 -0.501657882045278
-0.498143849685059 F -99.5500694612055 -99.3810983745063
-99.5325663984612 -99.6392800062527 -99.73951756523 -99.7060811875667 HF
-100.26364113 -100.03380632 -100.25578584 -100.36271749 -100.46078807
-100.42933826

au -0.214237353354915 -0.153373630054116 -0.223885126099216
-0.224212335974548 -0.219612622724726 -0.22511322274824 kcal/mol
-134.435997629254 -96.2434264774877 -140.490067722399 -140.695395063012
-137.809030804563 -141.260710169251 kj/mol -562.856366002166
-402.951785489093 -588.203534560005 -589.063198659029 -576.978574554484
-591.430058815202

159.904580513073 -25.3471685578392 -26.2068326568634 -14.1222085523184
-28.573692813036

Bond Length 0.923950982824 0.900340751725 0.924679431641 0.933968794128
0.925568726807 0.918338021643

-0.023610231099 0.000728448817 0.010017811304 0.001617743983
-0.005612961181

CCSD(T) HF MP2 PBE B3LYP M06 H -0.499334315439586 -0.499334315439586
-0.499334315439586 -0.499225147772742 -0.501657882045278
-0.498143849685059 Cl -459.609931089168 -459.47278229267
-459.592144154451 -459.952206689968 -460.161485956314 -460.126428258064
HCl -460.27230226 -460.09259017 -460.25177151 -460.61878758
-460.82771784 -460.793591637278

au -0.163036855392403 -0.120473561890418 -0.160293040109462
-0.167355742259238 -0.164574001640731 -0.169019529528944 kcal/mol
-102.307193221827 -75.5983175999055 -100.585422769121 -105.017336226764
-103.271767261602 -106.061378724223 kj/mol -428.339551966759
-316.514884930649 -421.13084687891 -439.686373279541 -432.378028627339
-444.057568319818

111.82466703611 7.20870508784981 -11.3468213127818 -4.03847666057953
-15.718016353059

Bond Length 1.291972727458 1.276814604888 1.287841665946 1.301249540975
1.294710648928 1.29478096143

-0.01515812257 -0.004131061512 0.009276813517 0.00273792147
0.002808233972

*****

Text For Post-Completion: How did DFT do, compared to your previous
results? All of the functionals did considerably better than HF, and
they generally did roughly as well as MP2 (and sometimes even better).
This trend is true of both the binding energies and the bond lengths. If
you were to repeat these tests for other types of systems (e.g., small
organic molecules, transition metal complexes, solid materials,
polypeptides, etc.) you would often find roughly the same thing: DFT is
usually (but not always) a big improvement over HF, and is often
competitive with some post-HF methods. There are some important caveats,
however: some DFT functionals struggle with certain types of systems,
and some DFT functionals are generally more reliable than others. We'll
talk more about this nuance later on.

The Hohenberg-Kohn Theorem One of the key moments in the history of DFT
is the discovery of the first "Hohenberg-Kohn Theorem" in 1964. In
slightly simplified terms, this is a mathematical proof that there is a
one-to-one relationship between the external potential of a
system---which in chemical contexts is usually composed of the sum of
the nuclear Coulomb potentials of the nuclei composing your molecular
system---and the ground-state electronic density of that system. (In
some types of calculations, the external potential can also include more
terms, such as an external electromagnetic field. However, for the
purposes of this lesson, we don't need to worry about this nuance, and
will just treat the "external potential" as being the same as the
"nuclear potential".) The result of the Hohenberg-Kohn theorem is
therefore the following: a particular arrangement of atomic nuclei in a
molecular system will result in a specific ground-state electronic
density that no other arrangement of atomic nuclei will produce (not
counting indistinguishable changes, like swapping the position of
identical nuclei, such as two hydrogens). This shouldn't be too
surprising: you probably never really expected that two different
molecules, with different atomic nuclei in different locations, would
ever have exactly the same electron density. It would therefore be very
strange if, for example, you could replace a hydrogen nucleus with a
lithium nucleus without changing the distribution of the electrons
within the system. \[Insert self assessment: show the electron density
distribution for several molecules, and ask students to guess which (of
a set of options) nuclear configuration created that density
distribution\] The Hohenberg-Kohn theorem simply tells us that for any
specific distribution of the electron density, there is exactly one
external potential that could produce that density:

*****

Even if the Hohenberg-Kohn theorem isn't very surprising, it does have
some important implications regarding the way we can think about how
quantum chemistry calculations work. Normally, we start our calculations
with a specific external potential (that is, a specific arrangement of
atomic nuclei) and then try to figure out what the converged, ground
state electronic density is that would correspond to that potential. The
Hohenberg-Kohn theorem tells us that, at least in principle, this
process can also go the other way: if someone gives you the converged
electron density of a system, you should be able to figure out the
external potential that created that specific distribution of electron
density. Figuring out how to calculate the external potential from the
electron density is another matter entirely (you might also be wondering
why you would ever want to do such a calculation - we'll get to that
later). As a general rule, solving "inverse problems" - that is,
problems where you try to calculate causes (such as the external
potential) from their observable effects (such as the electron density
distribution) - are a computational nightmare. It's almost always easier
to start with a cause and calculate an effect. That having been said, I
can give you a conceptually straightforward way to calculate the
external potential from the electron density: Construct a list of every
possible configuration of atomic nuclei. Yes, this list will be
infinitely large and include every possible geometry of every possible
molecule. For every entry in the list, run a highly accurate quantum
calculation to compute the electron density from the external potential.
Ideally, these should be full CI calculations in an infinite basis set.
Record the electron densities you compute. Find the entry in this list
that has the electron density you were given. The external potential
that was used to compute that electron density is the answer you were
looking for. Ta-da! Sure, the process above requires an infinite number
of infinitely expensive calculations that require an infinite amount of
storage space, but the point is that it is correct. I never said it
would be practical. Perhaps you think you know a better way. Maybe you
do. Regardless, we can most certainly say that there is at least one
process for which the following is true:

*****

If we know the external potential, what else can we calculate? The
answer is everything, of course! All you need to do is run a traditional
quantum calculation, starting with the external potential, and then you
can calculate whatever you like: the total energy, the kinetic energy,
the wavefunction, the Hamiltonian, etc. This means that even if all we
start with is the electron density, we can calculate any property of the
system:

Or, we could simply say:

The little diagram above is the origin of the term "Density Functional
Theory". A function is just a mathematical structure that can convert
one or more inputs into an output. The electron density distribution is
a function of position: at every point in space, the electron density
distribution has a different value. You can imagine the electron density
distribution as just being an infinite list containing the value of the
electron density at every point in space. Give the electron density
distribution a position, and it can give you the value of the electron
density at that position:

A functional is a function of a function (technically, the word
"functional" can mean several different things - this is simply how DFT
researchers tend to use the word). We've learned that external
potentials can be expressed as a functional of the electron density
distribution: you can imagine an infinite list that contains the
external potential corresponding to every possible electron density
distribution.

The same thing is true of every other property of a molecular system.
The energy is a functional of the electron density distribution. The
wavefunction is a functional of the density distribution. The
vibrational frequencies are a functional of the density distribution.
One way or another, everything can somehow be represented as a
functional of the electron density distribution.

*****

Making this Useful Based on what we've talked about so far, DFT probably
doesn't sound very useful. When would you ever know the electron density
distribution of a molecular system, but not the position of the nuclei
(and thus the external potential)? Probably never. What makes DFT
interesting is that it suggests the possibility of a different approach
to quantum computation. In previous lessons, we've described HF and
post-HF methods that are primarily based around evaluation of the
wavefunction: you start with the external potential and a guess for the
wavefunction, and then iteratively update the Hamiltonian and the
wavefunction until they converge to self-consistency. Could we do
something similar, except using the electron density distribution
instead of the wavefunction? Could we start with the external potential
and a guess for the electron density distribution, and then perform some
sort of iterative process in which we converge the electron density
distribution to a self-consistent value? It turns out that there
absolutely is a DFT analogue to the sort of self-consistent convergence
that is performed in HF and post-HF theories. In the case of DFT, the
self-consistent process requires representing specific potential terms -
specifically potential terms that include the interactions between
electrons - as functionals of the density. Somewhat ironically, since we
already know the external potential, we actually don't need to represent
it as a functional of the density. Adding the external potential and the
potential associated with interactions between the electrons yields the
total potential felt by the electron density distribution, which plays a
similar role to that of the Hamiltonian in wavefunction-based
calculations. By iteratively updating the potential terms and the
electron density distribution, you can reach self-convergence using DFT.
Of course, to do this in a practical context, you could never follow the
outrageously costly approach to evaluating functionals of the density
that I outlined in the previous section. Instead, practitioners of DFT
have developed numerous density functionals that are intended to mimic
the results of the actual functionals, but with a minimum amount of
computational effort. We'll talk about these approximate functionals in
more detail later on. For now, just understand that the functionals
people use for real-world DFT calculations are imperfect, but also far
cheaper to evaluate than the Hamiltonian in most post-HF methods. People
will often say things like "the Hohenberg-Kohn theorem tells us that
there is an exact functional for performing quantum calculations, and
all we need to do is discover it!" This is completely false; we've
already talked about an exact functional in the previous section. The
problem isn't that we don't know the exact DFT functionals, it's that we
don't like the exact DFT functionals - we're forced to use approximate
functionals out of practical necessity, not ignorance. Nothing about the
Hohenberg-Kohn theorem promises that there is a convenient, easily
evaluated functional expression for computing exact molecular
properties. DFT is not a "free lunch"; it's just a different way of
trying to approximate solutions to extremely complex problems.

*****

Example 2: Self-Interaction Error One of the unfortunate consequences of
using approximate functionals is the problem of self-interation error
(SIE), which means that electrons interact with themselves in unphysical
ways \[https://pubs.acs.org/doi/10.1021/acs.jpclett.8b00242,
https://wires.onlinelibrary.wiley.com/doi/10.1002/wcms.1631#wcms1631-bib-0119\].
That might sound peculiar, but it's actually a fairly simple concept.
Think about it this way: DFT functionals rely on using the total
electron density distribution to compute all interactions between
electrons. Of course, an individual electron doesn't directly interact
with the entire distribution of all the electrons, even within the
context of mean-field theory: it only interacts with the distribution of
all the other electrons. It's very challenging for DFT functionals to
fully account for this distinction without introducing a significant
amount of computational complexity. Practical DFT functionals have the
unfortunate side-effect of causing electrons to interact with
themselves - and the results can sometimes be bizarre. One specific
place where SIE is especially conspicuous is the humble hydrogen atom.
There is only one electron in this system, so there isn't any
interaction between electrons whatsoever. As we've previously seen, even
simple HF theory is exact for the hydrogen atom. Approximate DFT
functionals suffer from SIE, and thus don't produce exact results for
the hydrogen atom. Let's investigate this with a few simple tests.
First, compute the ground state energy of the hydrogen atom using HF
theory, as well as the PBE, B3LYP, and M06 functionals, and place the
results in the table below. Then, compute the binding energy of H2+
using the same set of methods. Once again, this system only has a single
electron, so HF theory is exact. Place the results in the table below.

*****

Example Input File #1: HF on H2+:

molecule hydrogen { 1 2 H 0.0 0.0 0.0 H 1.0 0.0 0.0 }

set basis aug-pcseg-4

set reference uhf set freeze_core True

optimize(\'HF\')

Example Input File #2: PBE on H2+:

molecule hydrogen { 1 2 H 0.0 0.0 0.0 H 1.0 0.0 0.0 }

set basis aug-pcseg-4

set reference uks set freeze_core True

optimize(\'PBE\')

Results:

Hydrogen Atom Exact HF PBE B3LYP M06 Energy (Eh) -0.5 -0.49999854886696
-0.499990207240021 0.497556728871164 -0.500183928481793 Error (kJ/mol)

0.003812497945361 0.025728087135987 2620.83687321911 -0.483227202190213

H2+ Exact HF PBE B3LYP M06 Energy (Eh) N/A -0.60262999 -0.61005711
0.38938565 -0.60813757 Binding Energy (kJ/mol)

-269.639066619766 -289.17392758285 -284.193112949322 -283.621849365255

\[WIP: ADD SOME TEXT FOR POST-COMPLETION\]

Orbital-Free Density Functional Theory The idea that maybe we can run
quantum calculations where we primarily work with the electron density,
rather than than the wavefunction, was quite exciting to many theorists.
As we've seen in previous lessons, wavefunctions can be complicated,
finicky, many-dimensional monstrosities. By comparison, the electron
density distribution seems downright simple: it's just a set of values
in plain, boring, three dimensional space. Could we somehow escape the
tyranny of the wavefunction, and only work with the electron density
distribution? The Wavefunction

Doug Keenan, GPL http://www.gnu.org/licenses/gpl.html, via Wikimedia
Commons The Electron Density Distribution

Jud McCranie, CC BY 3.0 https://creativecommons.org/licenses/by/3.0, via
Wikimedia Commons

