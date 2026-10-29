# Personal Git identity

This personal website uses the `pablohl` identity. The versioned [pre-commit hook](../.githooks/pre-commit) rejects an unexpected effective author or committer name/email, disabled signing configuration, or an SSH signing key with a different fingerprint. It checks environment overrides as well as Git configuration. The key fingerprint is public; the private key is never stored in this repository.

## Activate in each checkout

Git does not activate versioned hooks when cloning. From the repository root, configure this checkout:

```sh
git config --local user.name 'Pablo Hernandez Leal'
git config --local user.email 'hlealpablo@gmail.com'
git config --local gpg.format ssh
git config --local commit.gpgsign true
git config --local user.signingkey "$HOME/.ssh/id_ed25519_pablohl.pub"
git config --local core.hooksPath .githooks
```

Use the location of your personal public key if it differs. The hook accepts a different path when the fingerprint matches. It requires `ssh-keygen` and a readable key file. If the personal key changes, deliberately update the expected fingerprint in the hook.

For pushing from this machine, the existing `github-pablohl` SSH alias selects the personal account:

```sh
git remote set-url origin git@github-pablohl:pablohl/pablohl.github.io.git
```

That alias must be configured in your own SSH configuration; it is not installed by the hook. Commit attribution and push authentication are separate. The hook checks commit identity and signing configuration, not the account authenticating a push.

## Limits

This is a local mistake-prevention guard, not server-side enforcement. Git options such as `--no-verify`, an alternate hooks path, or disabling signing for a single commit can bypass parts of it. It does not validate imported history, and it does not retroactively change merged commits. A required GitHub check would be a separate layer of protection.
