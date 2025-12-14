param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl
)

$ErrorActionPreference = 'Stop'

Set-Location -Path $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'Git no está instalado o no está en PATH. Instalá Git (o GitHub Desktop) y reintentá.'
}

# Initialize if needed
if (-not (Test-Path -Path (Join-Path $PSScriptRoot '.git'))) {
  git init
}

git add -A

# Commit only if there are changes to commit
$porcelain = git status --porcelain
if ($porcelain) {
  git commit -m 'Publish landing'
}

# Ensure main branch
try {
  git branch -M main
} catch {
  # ignore
}

# Remote origin
$hasOrigin = $false
try {
  $remotes = git remote
  if ($remotes -match 'origin') { $hasOrigin = $true }
} catch {
  $hasOrigin = $false
}

if (-not $hasOrigin) {
  git remote add origin $RepoUrl
} else {
  git remote set-url origin $RepoUrl
}

git push -u origin main

Write-Host 'OK: archivos subidos a GitHub.'
Write-Host 'Siguiente paso: en GitHub → Settings → Pages → Deploy from a branch → main / root.'
