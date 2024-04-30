# Contributing To Symmetry

Thank you for your interest in contributing to Symmetry!

Table of Contents:

1. [Feature Requests](#feature-requests)
2. [Bug Reports](#bug-reports)
3. [Patches / Pull Requests](#patches--pull-requests)
    1. [Testing](#testing)
    2. [Performance](#performance)
    3. [Documentation](#documentation)
    4. [Style](#style)
4. [Release Process](#release-process)
5. [Contact](#contact)

## Feature Requests

Feature requests should be reported in the
[Symmetry issue tracker](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues). To reduce the number of
duplicates, please make sure to check the existing
[enhancement](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aenhancement)
and
[missing feature](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22B+-+missing+feature%22)
issues.

## Bug Reports

Bug reports should be reported in the
[Alacritty issue tracker](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues).

If a bug was not present in a previous version of Alacritty, providing the exact commit which
introduced the regression helps out a lot.

## Patches / Pull Requests

All patches have to be sent on Github as [pull requests](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/pulls).

If you are looking for a place to start contributing to Alacritty, take a look at the
[help wanted](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
and
[easy](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues?q=is%3Aopen+is%3Aissue+label%3A%22D+-+easy%22)
issues.

### Testing

To make sure no regressions were introduced, all tests should be run before sending a pull request.
The following command can be run to test Symmetry:

```
pytest test
```

Additionally if there's any functionality included which would lend itself to additional testing,
new tests should be added. These can either be in the form of Pytest tests using the `#[test]`
annotation, or Symmetry's ref tests.

### Performance

If changes could affect throughput or latency of Alacritty, these aspects should be benchmarked to
prevent potential regressions. Since there are often big performance differences between Rust's
nightly releases, it's advised to perform these tests on the latest Rust stable release.

### Documentation

Code should be documented where appropriate. The existing code can be used as a guidance here and
the general `python/ react rules set can be decided` rules can be followed for formatting.

If any change has been made to the `config.rs` file, it should also be documented in the man pages.

The change log should be used to document changes from a user-perspective, instead of explaining the
technical background (like commit messages) More information about Alacritty's change log format can
be found [here](https://keepachangelog.com).

### Style

All Symmetry changes are automatically verified by CI to conform to its "decided coding guildline" guidelines. If a CI
build is failing because of formatting issues, format using 3rd party tool

Unless otherwise specified, Symmetry follows the "decided guidlines" style guidelines:

All comments should be fully punctuated with a trailing period. This applies both to regular and
documentation comments.

# Release Process

Symmetry's release process aims to provide stable and well tested releases without having to hold
back new features during the testing period.


# Contact

If there are any outstanding questions about contributing to Symmetry, they can be asked on the
[Symmetry issue tracker](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/issues).

As a more immediate and direct form of communication, email at 
