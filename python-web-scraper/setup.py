#!/usr/bin/env python

from distutils.core import setup

setup(
    name='python-web-scraper',
    author='Andre Rosa',
    author_email='andreros@gmail.com',
    version='0.1dev',
    packages=['src', 'src/common', 'src/scraper', 'src/test'],
    license='Creative Commons Attribution-Noncommercial-Share Alike license',
    long_description=open('README.md').read(),
)
